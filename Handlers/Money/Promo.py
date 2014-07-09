from datetime import *
from Handlers.BaseHandler import *
from Models.Money.Promo import PromoCode

import logging

class PromoPage(BaseHandler):
    def get(self, action=None):
        if action=='gen':
            self.render('admin/coupongen.html', **self.params)

    def post(self, action=None):
        if action=='gen':
            name = self.request.get('code')
            amt = self.request.get('amount')
            # Look up code
            c = PromoCode.by_code(name)
            if not c:
                c = PromoCode(code=name, amount=float(amt))
                c.put()
            self.params['last_code'] = c.code
            self.params['last_amount'] = c.amount

            self.render('admin/coupongen.html', **self.params)
