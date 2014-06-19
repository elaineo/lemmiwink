from google.appengine.ext import ndb
from Models.User.Account import UserAccounts
import logging
import json

# Customer Address Book #
##########

class Address(ndb.Model):
    street = ndb.StringProperty()
    apt = ndb.StringProperty()
    city = ndb.StringProperty()
    state = ndb.StringProperty()
    zipcode = ndb.StringProperty()
    locpt = ndb.GeoPtProperty(default=ndb.GeoPt(37.4,-122))
    created = ndb.DateTimeProperty(auto_now_add=True)

    @classmethod
    def by_userid(cls, userid):
    	key = ndb.Key('UserAccounts', str(userid))
        return cls.query(ancestor=key)

    @classmethod
    def by_key(cls, key):
        return cls.query(ancestor=key)

    def to_dict(self):
        p = { 'street' : self.street,
                'zip' : self.zipcode }
        if self.apt:
            p['apt']=self.apt
        if self.city:
            p['city']=self.city
        if self.state:
            p['state']=self.state
        if self.locpt:
            p['lat'] = self.locpt.lat
            p['lon'] = self.locpt.lon
        return p
