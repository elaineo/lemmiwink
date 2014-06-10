from google.appengine.ext import ndb

""" Attached to confirmed Offers """
""" Parent will be an OfferRequest or OfferRoute """


class Transaction(ndb.Model):
    sender = ndb.KeyProperty(required=True)
    driver = ndb.KeyProperty(required=True)
    delivered = ndb.BooleanProperty(default=False)
    payout = ndb.FloatProperty(default=0.00)
    paid = ndb.BooleanProperty(default=False)
    delivend = ndb.DateProperty() 
    created = ndb.DateTimeProperty(auto_now_add=True)
            
    @classmethod
    def by_driver(cls,driver,paid=None):
        if paid is not None:
            return cls.query(ndb.AND(cls.driver==driver, cls.paid==paid))
        else:
            return cls.query().filter(cls.driver==driver)  

    @classmethod
    def by_reservation(cls,rezkey):
        return cls.query(ancestor=rezkey)  

    @classmethod
    def by_sender(cls,key):
        return cls.query(cls.sender==key)
        
    # these should go in their separate utils!!!
    @classmethod
    def deliveries_completed(cls, key):
        d = cls.query(ancestor=key).count()
        return d
        
    @classmethod
    def earnings_by_userkey(cls, key):
        trans = cls.query(cls.driver == key)
        total = 0.00
        for t in trans:
            total = total + t.payout
        return total
        
    def to_dict(cls):
        route = cls.key.parent().get()
        r = { 'sender': cls.sender.get().fullname,
              'receipt_url' : '/reserve/' + cls.reservation.urlsafe(),
              'locstart' : route.locstart,
              'locend' : route.locend,
              'delivend' : cls.delivend.strftime('%m/%d/%Y'),
              'earnings' : cls.payout }
        return r