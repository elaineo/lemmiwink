from Handlers.BaseHandler import *
import json
import logging

class MobilePage(BaseHandler):
    """ Mobile menu pages """
    def get(self, action=None):
        logging.info(self.user_prefs)
        if action=='home' and self.user_prefs:
            self.render('home.html', **self.params)
        elif action=='payment':
            self.render('payment.html', **self.params)
        elif action=='fillprofile':
            self.render('fillprofile.html', **self.params)
        elif action=='profile':
            self.render('profile.html', **self.params)
        elif action=='photoid':
            self.render('photoid.html', **self.params)

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
            return
