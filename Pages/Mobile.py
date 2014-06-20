from Handlers.BaseHandler import *
from Models.Product.Listing import *
import json
import logging

class MobilePage(BaseHandler):
    """ Mobile menu pages """
    def get(self, action=None):
        logging.info(self.user_prefs)
        if action=='home':
            self.params['code']=self.user_prefs.code()
            self.render('home.html', **self.params)
        elif action=='payment':
            self.render('payment.html', **self.params)
        elif action=='fillprofile':
            self.render('fillprofile.html', **self.params)
        elif action=='profile':
            self.params.update(self.user_prefs.to_dict(True))
            self.render('profile.html', **self.params)
        elif action=='support':
            self.render('support.html', **self.params)
        elif action=='about':
            self.render('about.html', **self.params)
        elif action=='photoid':
            self.render('photoid.html', **self.params)
        elif action=='catalog':
            self.params['catalog'] = Category.dump_cat()
            self.render('catalog.html', **self.params)
        elif action=='template':
            self.render('template.html', **self.params)
        elif action=='signup':
            self.render('signup.html', **self.params)

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
