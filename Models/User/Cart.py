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
    promo = ndb.FloatProperty(default=0.00)    #Promo code
    updated = ndb.DateTimeProperty(auto_now=True)

    def to_dict(self):
        items = []
        for i in self.cart_item:
            q = i.item.get().to_dict()
            q['qty'] = i.quantity
            items.append(q)
        p = { 'items' : items}
        return p

    # get index of cart item by key
    def item_idx(self, key):
        q = [i for i, j in enumerate(self.cart_item) if j.item == key]
        return q[0]

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
