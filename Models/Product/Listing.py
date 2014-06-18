from google.appengine.ext import ndb
import logging
import json

# Product listing #
class Category(ndb.Model):
    name = ndb.StringProperty()
    imglink = ndb.StringProperty()
    description = ndb.TextProperty()

class Listing(ndb.Model):
    """Later have reviews, ratings"""
    name = ndb.StringProperty()
    imglink = ndb.StringProperty()
    description = ndb.TextProperty()
    price = ndb.FloatProperty()
    unit = ndb.StringProperty()

    @classmethod
    def by_cat(cls, cat):
        return cls.query(ancestor=cat)
