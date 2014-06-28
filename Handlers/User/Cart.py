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
            logging.info(c)
            if c and len(c['cart_items'])>0:
                self.params['cart'] = c
                if self.user_prefs.cust_id:
                    self.params['chckout_url'] = '/pay/checkout'
                else:
                    self.params['chckout_url'] = '/pay/cc?cart=1'
            self.render('cart.html', **self.params)

    def post(self, action=None):
        if not self.user_prefs:
            self.redirect("/signup")
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
        # is it already there?
        i = cart.item_idx(key)
        if i>=0:
            ci = cart.cart_item[i]
        else:
            ci = None
            mm['status'] = 'Missing Item'
        if action=='inc' or action=='dec' and ci:
            ci.quantity = qty
            mm['status'] = 'ok'
        elif action=='rem' and ci:
            ci.pop(i)
            mm['status'] = 'ok'
        elif action=='add':
            if ci:
                ci.quantity = ci.quantity + 1
            else:
                c = CartItem(item=key, quantity=qty)
                cart.cart_item.append(c)
            mm['status'] = 'ok'
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
            cart.code = code
            cart.put()
        else:
            mm['status'] = 'Invalid code.'
        self.write(json.dumps(mm))
        return

