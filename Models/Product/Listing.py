from google.appengine.ext import ndb
import logging
import json

# Product listing #
class Category(ndb.Model):
    name = ndb.StringProperty()
    imglink = ndb.StringProperty()
    description = ndb.TextProperty()

    @classmethod
    def dump_cat(cls):
        cats = cls.query()
        params = []
        for c in cats:
            params.append(c.to_dict(True))
        return params


    def to_dict(self, inclprod=False):
        p = { 'name' : self.name,
                'imglink' : self.imglink,
                'description' : self.description}
        if inclprod:
            pdict = []
            listings = Listing.by_cat(self.key)
            for l in listings:
                pdict.append(l.to_dict())
            p['listings'] = pdict
        return p

class Listing(ndb.Model):
    """Later have reviews, ratings"""
    name = ndb.StringProperty()
    imglink = ndb.StringProperty()
    description = ndb.TextProperty()
    price = ndb.FloatProperty(default=1.00)
    unit = ndb.StringProperty(default='1/8 oz')
    thc = ndb.FloatProperty(default=-1)
    cbd = ndb.FloatProperty(default=-1)
    strain_type = ndb.StringProperty()

    @classmethod
    def by_cat(cls, cat):
        return cls.query(ancestor=cat)

    def to_dict(self):
        p = {   'name' : self.name,
                'imglink' : self.imglink,
                'description' : self.description,
                'price' : '%.0f' % self.price,
                'pricefl' : '%.2f' % self.price,
                'unit' : self.unit,
                'thc' : self.thc,
                'cbd' : self.cbd,
                'strain_type': self.strain_type,
                'key' : self.key.urlsafe()}
        cat = self.key.parent().get()
        p['cat'] = cat.name
        return p
