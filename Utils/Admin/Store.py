from google.appengine.ext import ndb
from Handlers.BaseHandler import *
from Models.Store import *
import datetime
import pytz
import logging
import json

PDT = pytz.timezone('US/Pacific')

class StoreHandler(BaseHandler):
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


def store_is_open(store):
    s = Store.by_store(store)
    now = datetime.now(PDT)
    is_open = False
    if s.open_biz:
        today = now.weekday()

