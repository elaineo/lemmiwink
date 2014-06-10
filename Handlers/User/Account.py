from Handlers.BaseHandler import *
from Models.User.Account import *
from Utils.UserUtils import *
from google.appengine.api import taskqueue
import hashlib
import logging
import json
import urlparse

class AccountHandler(BaseHandler):
    """ User sign up page """
    def get(self, action=None):
        if self.user_prefs: # if user is logged in, redirect to profile
            self.redirect("/profile")
        elif action=='signup':
            self.render('signup.html')
        elif action=='signout':
            self.__signout()

    """ User Sign Out Page """
    def __signout(self):
        logging.info('Log out')
        self.logout() # deletes cookie
        self.redirect('/')

    def post(self, action=None):
        if action=='signup':
            self.__signup()
        elif action=='signin':
            self.__signin()

    def __signup(self):
        self.response.headers['Content-Type'] = "application/json"
        data = json.loads(self.request.body)
        logging.info(data)
        # retrieve information
        password = data.get('password')
        email = data.get('email')
        mm={'error':None}
        if not valid_email(email):
            mm['error']="That's not a valid email address."
        else:
            mm['email'] = email
        u = UserAccounts.by_email(email)
        if not valid_pw(password):
            mm['error'] = "That wasn't a valid password."
        elif u:
            # sign them in
            self.__signin(u,password)
            return
        if mm['error'] is not None:
            mm['status'] = 'error'
            self.write(json.dumps(mm))
            return
        else:
            u = UserAccounts(email = email, pwhash = make_pw_hash(email, password))
            u.put()
            # return mobile login cookies
            mm['status'] = 'new'
            mm['userid'] = str(make_secure_val(u.user_id()))
            # return a cookie for local storage
            self.write(json.dumps(mm))
            return

    def send_user_info(self, email):
        htmlbody =  self.render_str('email/welcome_user.html', **self.params)
        textbody = welcome_user
        send_info(email, welcome_user_sub, textbody, htmlbody)


    def __signin(self,u,password):
        mm = {}
        if valid_pwhash(u.email, password, u.pwhash):
            self.login(u.user_id())
            self.set_current_user()
            mm['status'] = 'ok'
        else:
            mm['status'] = 'error'
            mm['error'] = "Invalid Login."
        self.response.headers['Content-Type'] = "application/json"
        self.write(json.dumps(mm))
