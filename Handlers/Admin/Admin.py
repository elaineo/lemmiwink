from google.appengine.ext import ndb
from Handlers.BaseHandler import *
from Models.User.Account import *
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
