from google.appengine.ext import ndb
import logging
import json

class HoldAccount(ndb.Model):
    uri = ndb.StringProperty()
    userkey = ndb.KeyProperty()
    reskey = ndb.KeyProperty()      # associated reservation
    amount = ndb.IntegerProperty()
    created = ndb.DateTimeProperty(auto_now_add=True)
    
    @classmethod
    def by_reskey(cls, key):
        u = cls.query().filter(cls.reskey == key).get()
        return u 
        
    @classmethod
    def by_userkey(cls, key):
        u = cls.query().filter(cls.userkey == key).get()
        return u         