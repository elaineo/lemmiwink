from google.appengine.ext import ndb
from Handlers.BaseHandler import *
from Models.Money.Transaction import *
import logging
import json

"""I have no idea how this is supposed to work """

class DeliveryHandler(BaseHandler):
    """ Delivery Status """
    def get(self, key=None):
        #t = ndb.Key(urlsafe=key).get()
        self.render('delivery.html', **self.params)
