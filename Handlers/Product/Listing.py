from google.appengine.ext import ndb
from Handlers.BaseHandler import *
from Models.Product.Listing import *
import logging
import json

class CatalogHandler(BaseHandler):
    """ Create addresses """
    def get(self, key=None):
        if not key:
            self.params['catalog'] = Category.dump_cat()
            logging.info(self.params['catalog'])
            self.render('catalog.html', **self.params)
        else:
            # return a product listing
            p = ndb.Key(urlsafe=key)
            try:
                prod = p.get()
            except:
                self.abort(404)
            self.params.update(prod.to_dict())
            self.render('listing.html', **self.params)
