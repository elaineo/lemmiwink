from google.appengine.ext import ndb
from Handlers.BaseHandler import *
from Models.User.Account import *
from Models.User.Cart import *
import logging
import json

class CartHandler(BaseHandler):
    """ Create addresses """
    def get(self, action=None):
        if not self.user_prefs: # if user is not logged in, redirect
            self.redirect("/signup")
        if action=='view':
            # get user's cart items
            c = Cart.dump_cart(self.user_prefs.key)
            if c:
                self.params['cart'] = c
            self.render('cart.html', **self.params)
