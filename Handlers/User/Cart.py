from google.appengine.ext import ndb
from Handlers.BaseHandler import *
from Models.User.Account import *
from Models.User.Cart import *
from Utils.ValidUtils import parse_unit
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

    def post(self, action=None):
        if action=='update':
            self.__update()
        elif action=='promo':
            self.__promo()

    def __update(self):
        self.response.headers['Content-Type'] = "application/json"
        data = json.loads(self.request.body)
        logging.info(data)
        datakey = data.get('key')
        qty = parse_unit(data.get('qty'))
        action = data.get('action')
        mm={'error':None}
        cart = Cart.by_key(self.user_prefs.key)
        if not action or not cart or not datakey:
            mm['error'] = 'Bad request.'
            self.write(json.dumps(mm))
            return
        key = ndb.Key(urlsafe=datakey)
        if action=='inc' or action=='dec':
            i = cart.item_idx(key)
            cart.cart_item[i].quantity = qty
        elif action=='rem':
            i = cart.item_idx(key)
            cart.cart_item.pop(i)
        elif action=='add':
            c = CartItem(item=key, quantity=qty)
            cart.cart_item.append(c)
        cart.put()
        self.write(json.dumps(mm))
        return

    def __promo(self):
        self.response.headers['Content-Type'] = "application/json"
        data = json.loads(self.request.body)
        logging.info(data)
        code = data.get('code')
        r = UserAccounts.by_code(code)
        mm={'error':None}
        if r:
            # give them credit for the referral
            r.referrals.append(self.user_prefs.key)
            mm['promo'] = '10.00'
            mm['status'] = 'ok'
            cart = Cart.by_key(self.user_prefs.key)
            cart.promo = 10.00
        else:
            mm['status'] = 'Invalid code.'
        self.write(json.dumps(mm))
        return

        #check to see if they have valid cc
        if self.user_prefs.cust_id:
            mm['next_url'] = '/pay/checkout'
        else:
            mm['next_url'] = 'pay/cc'

