from Handlers.BaseHandler import *
from Models.User.Account import *
from Utils.UserUtils import *
from google.appengine.api import taskqueue
import hashlib
import logging
import json
import urlparse

class SignupPage(BaseHandler):
    """ User sign up page """
    def get(self,action=None):
        if self.user_prefs: # if user is logged in, redirect to profile
            self.redirect("/profile")
        else:
            self.redirect('/')

    def post(self,action=None):
        if not action:
            return
        elif action=='p2p':
            self.__p2p()
        elif action=='mobile':
            self.__mobile()


    def __fbweb(self):
        self.response.headers['Content-Type'] = "application/json"
        remoteip = self.request.remote_addr

        code = self.request.get('code')
        p = urlparse.urlparse(self.request.url)
        url = p.scheme + '://' + p.netloc + p.path
        response = trade_code_for_access_token(url, code)

        if 'access_token' in response:
            access_token = response['access_token'][0]
            expire_time = response['expires'][0]
            debug_info = debug_token(access_token)

            if 'data' in debug_info and 'user_id' in debug_info['data']:
                user_id =  debug_info['data']['user_id']
                if user_id:
                    fbid = str(user_id)
                    # lookup ip address
                    gi = pygeoip.GeoIP(CITY_DB_PATH)
                    geo = gi.record_by_addr(remoteip)
                    if not geo:
                        gi = pygeoip.GeoIP(CITYV6_DB_PATH)
                        geo = gi.record_by_addr(remoteip)
                    if geo:
                        geocity = geo.get('city') #hehehe
                    else:
                        geocity = ''
                    # make user account
                    up = UserPrefs.by_userid(fbid)
                    if not up:
                        referral = self.read_secure_cookie('referral')
                        refcode = self.read_secure_cookie('code')
                        try:
                            stats = UserStats(referral=referral, code=refcode, ip_addr=[remoteip], locations=[geocity])
                        except:
                            logging.info(geocity)
                            stats = UserStats(referral=referral, code=refcode)
                        sett = UserSettings(notify=[1,2,3,4])
                        up = UserPrefs(account_type = 'fb', userid = fbid, img_id = -1, settings=sett, stats=stats)
                        up.put()
                        self.user_prefs = up
                        self.current_user_key = up.key
                        response = { 'status': 'new'}
                        logging.info('New account')
                        taskqueue.add(url='/signup/createfb?userkey='+up.key.urlsafe()+'&token='+access_token+'&expire='+expire_time, method='get')
                    else:
                        response = { 'status': 'existing'}
                        logging.info('Existing account login from ' + (geocity if geocity else ''))
                        try:
                            if geocity:
                                if not up.stats and remoteip:
                                    up.stats = UserStats(ip_addr=[remoteip], locations=[geocity])
                                elif remoteip not in up.stats.ip_addr:
                                    up.stats.ip_addr.append(remoteip)
                                if geocity not in up.stats.locations:
                                    up.stats.locations.append(geocity)
                                up.put()
                        except:
                            logging.info(geocity)
                            logging.info(remoteip)
                    # set cookies
                    self.login(fbid, 'fb')

                    self.redirect('/account')

                response = { 'status': 'fail'}
                self.write(json.dumps(response))

    def __mobile(self):
        data = json.loads(unicode(self.request.body, errors='replace'))
        idenc = data.get('userid')
        userid = idenc and check_secure_val(idenc)
        #I don't know that this is necessary...
        # supposed to check that their cookie is valid



    def __p2p(self):
        self.response.headers['Content-Type'] = "application/json"
        data = json.loads(self.request.body)
        logging.info(data)
        # retrieve information
        password = data.get('password')
        email = data.get('email')
        tel = data.get('tel')
        mm={'error':None}
        if not valid_email(email):
            mm['error']="That's not a valid email address."
        else:
            mm['email'] = email
        tel = valid_tel(tel)
        if not tel:
            mm['error'] = "That is not a valid number."
        u = UserAccounts.by_email(email)
        if not valid_pw(password):
            mm['error'] = "That wasn't a valid password."
        elif u:
            mm['error']="That user exists already."
            # This is a hack because Android blows and double-fires events
            if u.pwhash:
                mm['status'] = 'ok'
                mm['account'] = make_secure_val('p2p')
                mm['userid'] = make_secure_val(email)
                self.write(json.dumps(mm))
                return
        if mm['error'] is not None:
            mm['status'] = 'error'
            self.write(json.dumps(mm))
            return
        else:
            # make user account
            up = UserPrefs.by_email(email)
            if not up:
                up = UserPrefs(account_type = 'p2p', email = email, tel=tel)
                up.put()
            u = UserAccounts(email = email, pwhash = make_pw_hash(email, password), parent=up.key)
            u.put()
            # return mobile login cookies
            mm['status'] = 'ok'
            mm['account'] = make_secure_val('p2p')
            mm['userid'] = make_secure_val(email)
            # return a cookie for local storage
            self.write(json.dumps(mm))
            return

    def send_user_info(self, email):
        htmlbody =  self.render_str('email/welcome_user.html', **self.params)
        textbody = welcome_user
        send_info(email, welcome_user_sub, textbody, htmlbody)


class SigninPage(BaseHandler):
    """ User Sign In Page """
    def get(self):
        # we should never end up here
        self.redirect('/')
    def post(self,action=None):
        email = self.request.get('email')
        password = self.request.get('password')
        if not action:
            self.__post(email,password)
        elif action=='mobile':
            self.__mobile(email,password)
    def __post(self,email,password):
        u = UserAccounts.login(email, password)
        response = {}
        if u:
            self.login(email)
            self.set_current_user()
            self.fill_header()
            response['has_error'] = 0
        else:
            response['has_error'] = 'email'
            response['erroremail'] = 'invalid login'
        self.response.headers['Content-Type'] = "application/json"
        self.write(json.dumps(response))
    def __mobile(self,email,password):
        self.response.headers['Content-Type'] = "application/json"
        if email and password:
            u = UserAccounts.login(email, password)
            if u:
                if not u.login_token:
                    u.set_login_token()
                mm = u.as_json()
                mm['status'] = 'success'
                self.write(json.dumps(mm))
                return
        mm = {'status' : 'fail'}
        self.write(json.dumps(mm))
        return


class SignoutPage(BaseHandler):
    """ User Sign Out Page """
    def get(self):
        logging.info('Log out')
        self.logout() # deletes cookie
        self.redirect('/')
