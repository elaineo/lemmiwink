from google.appengine.ext import ndb
from Handlers.BaseHandler import *
from Models.User.Account import *
from Models.User.Cart import *
from Utils.data.defs import stripe_key
import logging
import json
import stripe

class PaymentHandler(BaseHandler):
    """ Create addresses """
    def get(self, action=None):
        if not self.user_prefs: # if user is not logged in, redirect
            self.redirect("/signup")
        if action=='cc':
            self.params['next_url'] = '/m/home'
            self.render('payment.html', **self.params)

    def post(self, action=None):
        if action=='cc':
            self.__createcc()

    def __createcc(self):
        stripe.api_key = stripe_key
        self.response.headers['Content-Type'] = "application/json"
        data = json.loads(self.request.body)
        logging.info(data)

        u = self.user_prefs

        # Get the credit card details submitted by the form
        token = data.get('stripeToken')
        userid = u.user_id()

        # Create a Customer
        customer = stripe.Customer.create(
            card=token,
            description=userid,
            email=u.email
        )

        #save id to user account
        u.cust_id = customer.id
        u.put()
        mm = {'status':'ok'}
        self.write(json.dumps(mm))
        return

    def __charge(self):
        u = self.user_prefs
        customer_id = get_stripe_customer_id(u.cust_id)
        # Charge the Customer instead of the card
        stripe.Charge.create(
            amount=1000, # in cents
            currency="usd",
            customer=customer_id
        )
