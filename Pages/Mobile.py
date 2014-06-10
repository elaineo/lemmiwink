from Handlers.BaseHandler import *
import json
import logging

class MobilePage(BaseHandler):
    """ Mobile menu pages """
    def get(self, action=None):
    	logging.info(self.user_prefs)
    	if action=='home' and self.user_prefs:
			self.render('home.html', **self.params)
    	elif action=='payment':
	        self.render('payment.html', **self.params)
        elif action=='fillprofile':
        	self.render('fillprofile.html', **self.params)
        elif action=='profile':
        	self.render('profile.html', **self.params)
