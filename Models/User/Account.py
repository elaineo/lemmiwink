from google.appengine.ext import ndb
from Models.User.Cart import Cart
import logging
import json

# Models #
##########

class UserStats(ndb.Model):
    refcode = ndb.StringProperty()
    referrals = ndb.KeyProperty(repeated=True)  #users that they referred
    #remnant from Barnacle, not using this right now
    ip_addr = ndb.StringProperty(repeated=True)
    locations = ndb.StringProperty(repeated=True)

class UserAccounts(ndb.Model):
    valid = ndb.BooleanProperty(default=False)
    email = ndb.StringProperty()
    pwhash = ndb.StringProperty() # hashed pw
    tel = ndb.StringProperty()
    addr_deliv = ndb.KeyProperty() # default address for deliveries
    addr_bill = ndb.KeyProperty() # default address for billing - might not need this
    cust_id = ndb.StringProperty() # customer payment ID
    cc = ndb.StringProperty()
    fullname = ndb.StringProperty()
    cardimg = ndb.BlobKeyProperty()  # Recommendation ID image
    cardid = ndb.IntegerProperty() # Recommendation ID number
    last_active = ndb.DateTimeProperty(auto_now=True)
    created = ndb.DateTimeProperty(auto_now_add=True)

    def init(self):
        # create cart on acct creation
        Cart(parent=self.key).put()
        UserStats(parent=self.key, refcode=str(self.key.id())[-4:]).put()
        return


    @classmethod
    def by_email(cls, email):
        u = cls.query(cls.email == email).get()
        return u

    @classmethod
    def by_userid(cls, userid):
        return cls.get_by_id(int(userid))

    @classmethod
    def by_code(cls, code):
        u = UserStats.query(UserStats.refcode == code)
        if u:
            return u.key.parent()

    def user_id(self):
        return self.key.id()

    def to_dict(self, addr=False):
        p = { 'email' : self.email }

        if self.fullname:
            p['name'] = self.fullname
        if self.tel:
            p['tel'] = self.tel
        if addr and self.addr_deliv:
            a = self.addr_deliv.get()
            p['addr'] = a.to_dict()
        return p

    def cardimg_link(self):
        r = '/imgdown/%s' % (self.cardimg)
        return r

    def code(self):
        return str(self.key.id())[-4:]

class WebAccount(ndb.Model):
    email = ndb.StringProperty()
    location = ndb.StringProperty()
    created = ndb.DateTimeProperty(auto_now_add=True)
