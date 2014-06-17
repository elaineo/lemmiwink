from Handlers.BaseHandler import *
from Utils.PageUtils import *
import urlparse
import json

class HomePage(BaseHandler):
    """ Home page, first page shown """
    def get(self):
    	# make sure they have a valid card
    	if self.user_prefs:
    		if self.user_prefs.valid:
		        self.render('catalog.html', **self.params)
	        else:
	        	self.render('photoid.html', **self.params)
    	else:
    		self.render('signin.html', **self.params)
