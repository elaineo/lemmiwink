from google.appengine.ext import ndb
from Handlers.BaseHandler import *
from Models.Product.Listing import *
from Utils.data.products import categories
import logging
import json

class PopulateHandler(BaseHandler):
    def get(self, action=None):
    # check to make sure self.user_prefs is Elaine
        if action=='catalog':
            #populate products in catalog
            for c in categories:
                cat = Category(name = c['name'], imglink = c['filename'], description = c['desc'])
                cat.put()
                for l in c['listings']:
                    p = Listing(name = l['name'], imglink = l['filename'], description =l['desc'], price = l['price'], thc = l['thc'], cbd = l['cbd'], strain_type = l['strain_type'],
                        parent = cat.key )
                    p.put()
            self.write('catalog populated.')
        elif action=='clear':
            cats = Category.query()
            for c in cats:
                c.key.delete()
            listings = Listing.query()
            for l in listings:
                l.key.delete()
            self.write('all gone.')
        else:
            self.write('command not found.')


