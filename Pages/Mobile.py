from Handlers.BaseHandler import *
from Models.Product.Listing import *
from Utils.EmailUtils import send_alert
from Utils.data.defs import domain
from google.appengine.api import taskqueue
import json
import logging

class MobilePage(BaseHandler):
    """ Mobile menu pages """
    def get(self, action=None):
        logging.info(self.user_prefs)
        if not self.user_prefs:
            self.redirect('/account/signin')
            return
        if action=='payment':
            self.render('payment.html', **self.params)
        elif action=='profile':
            if self.user_prefs.addr_deliv:
                self.params.update(self.user_prefs.to_dict(True))
                self.render('profile.html', **self.params)
            else:
                self.render('fillprofile.html', **self.params)
        elif action=='support':
            self.render('support.html', **self.params)
        elif action=='about':
            self.render('about.html', **self.params)
        elif action=='photoid':
            self.render('photoid.html', **self.params)
        elif action=='catalog':
            if not self.user_prefs.valid:
                self.redirect('/')
            self.params['catalog'] = Category.dump_cat()
            self.render('catalog.html', **self.params)

    def post(self, action=None):
        if not self.user_prefs:
            return
        if action=='regid':
            data = json.loads(self.request.body)
            logging.info(data)
            u = self.user_prefs
            uu = data.get('uu')
            mm={'error':None}
            if uu:
                u.cardimg = ndb.BlobKey(uu)
                u.put()
                mm['status'] = 'ok'
            else:
                mm['status'] = 'error'
            self.write(json.dumps(mm))
            notify_id(u)
            return

def notify_id(user):
    subject = 'New Weed Card'
    msg = domain + user.cardimg_link()
    send_alert(msg,subject)
