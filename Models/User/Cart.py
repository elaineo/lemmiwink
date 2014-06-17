from google.appengine.ext import ndb
from Models.User.Account import UserAccounts
import logging
import json

# Shopping Cart #
##########

class CartItem(ndb.Model):
    item = ndb.KeyProperty()
    quantity = ndb.IntegerProperty()


class Cart(ndb.Model):
    cart_item = ndb.StructuredProperty(CartItem)
    code = ndb.KeyProperty()    #Promo code
    updated = ndb.DateTimeProperty(auto_now=True)
    created = ndb.DateTimeProperty(auto_now_add=True)

    @classmethod
    def by_userid(cls, userid):
    	key = ndb.Key('UserAccounts', str(userid))
        return cls.query(ancestor=key)

    @classmethod
    def by_key(cls, key):
        return cls.query(ancestor=key)


