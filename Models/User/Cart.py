from google.appengine.ext import ndb
from Utils.data.defs import default_shipping
import logging
import json

# Shopping Cart #
##########

class CartItem(ndb.Model):
    item = ndb.KeyProperty()
    quantity = ndb.IntegerProperty()


class Cart(ndb.Model):
    cart_item = ndb.StructuredProperty(CartItem, repeated=True)
    code = ndb.KeyProperty()    #promo code
    promo = ndb.FloatProperty(default=0.00)    #Promo amount
    updated = ndb.DateTimeProperty(auto_now=True)

    def item_count(self):
        q = 0
        for c in self.cart_item:
            q = q+c.quantity
        return q

    def total(self):
        tot = 0
        for c in self.cart_item:
            item = c.item.get()
            tot += item.price * c.quantity
        if tot > 0:
            tot -= self.promo
            tot += default_shipping
        return tot

    def to_dict(self):
        items = []
        for i in self.cart_item:
            q = i.item.get().to_dict()
            q['qty'] = i.quantity
            items.append(q)
        p = { 'cart_items' : items,
               'code' : self.code,
               'promo' : '%.2f' % self.promo}
        return p

    # get index of cart item by key
    def item_idx(self, key):
        q = [i for i, j in enumerate(self.cart_item) if j.item == key]
        if len(q) > 0:
            return q[0]
        else:
            return -1

    # receive list of cart items
    def sync(self, sync_cart):
        # for name, value in changed_values.items():
        #     setattr(self, name, value)
        self.cart_item = sync_cart
        self.put()
        return

    @classmethod
    def by_userid(cls, userid):
    	key = ndb.Key('UserAccounts', str(userid))
        return cls.query(ancestor=key).get()

    @classmethod
    def by_key(cls, key):
        return cls.query(ancestor=key).get()

    @classmethod
    def dump_cart(cls, key):
        c = cls.by_key(key)
        if c:
            return c.to_dict()
        else:
            return None
