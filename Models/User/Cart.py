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
    cart_item = ndb.StructuredProperty(CartItem, repeated=True)
    code = ndb.KeyProperty()    #Promo code
    updated = ndb.DateTimeProperty(auto_now=True)
    created = ndb.DateTimeProperty(auto_now_add=True)

    def to_dict(self):
        items = []
        for i in self.cart_item:
            q = i.item.get().to_dict()
            q['qty'] = i.quantity
            items.append(q)
        p = { 'items' : items}
        return p

    @classmethod
    def by_userid(cls, userid):
    	key = ndb.Key('UserAccounts', str(userid))
        return cls.query(ancestor=key)

    @classmethod
    def by_key(cls, key):
        return cls.query(ancestor=key)

    @classmethod
    def dump_cart(cls, key):
        c = cls.by_key(key).get()
        if c:
            return c.to_dict()
        else:
            return None
