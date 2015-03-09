from google.appengine.ext import ndb
from Handlers.BaseHandler import *
from Models.User.Account import *
from Models.User.Address import *
import logging
import json

class AdminHandler(BaseHandler):
    def get(self, action=None, key=None):
    # check to make sure self.user_prefs is Elaine
        if action=='valid' and key:
            #validate registration id
            u = ndb.Key(urlsafe=key)
            try:
                uu = u.get()
                uu.valid = True
                uu.put()
                self.write('user validated.')
            except:
                self.write('user not found.')
        if action=='address':
            users = UserAccounts.query()
            for u in users:
                if u.addr_deliv:
                    a = u.addr_deliv.get()
                    if a:
                        logging.info(a)
                        new_a=Address(parent=u.key)
                        new_a.populate(street=a.street, apt = a.apt, city = a.city,
                state = a.state,  zipcode = a.zipcode, locpt=a.locpt)
                        new_a.put()
                        u.addr_deliv = new_a.key
                        a.key.delete()
            self.write('No more orphan addresses.')
