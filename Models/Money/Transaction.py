from google.appengine.ext import ndb
from Models.User.Cart import Cart

""" Attached to completed orders """


class Transaction(ndb.Model):
    customer = ndb.KeyProperty(required=True)
    cart = ndb.KeyProperty(required=True)
    delivered = ndb.BooleanProperty(default=False)
    amount = ndb.FloatProperty(default=0.00)
    delivend = ndb.DateTimeProperty()
    created = ndb.DateTimeProperty(auto_now_add=True)

    @classmethod
    def by_user(cls,key):
        return cls.query(cls.customer==key)

    def to_dict(self):
        cart = self.cart.get()
        customer = self.customer.get()
        r = { 'cart' : cart.to_dict(),
                'customer' : customer.to_dict(True),
                'amount' : self.amount }
        return r
