from Handlers.BaseHandler import *
import json

class HomePage(BaseHandler):
    """ Home page, first page shown """
    def get(self):
        # make sure they have a valid card
        if self.user_prefs:
            if self.user_prefs.valid:
                self.redirect('/m/catalog')
            else:
                if self.user_prefs.cardimg:
                    self.params['code']=self.user_prefs.code()
                    self.render('home.html', **self.params)
                else:
                    self.redirect('/m/photoid')
        else:
            promo = self.request.get('code')
            if promo and PromoCode.valid_code(promo):
                self.params['promo'] = promo
            self.render('index.html', **self.params)

class SplashPage(BaseHandler):
    """ Home page, first page shown """
    def get(self):
        self.render('index.html')


class LargePage(BaseHandler):
    """ Home page, first page shown """
    def get(self):
        self.render('base/web.html', **self.params)
