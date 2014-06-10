from Handlers.BaseHandler import *
from Utils.PageUtils import *
import urlparse
import json

class MobilePage(BaseHandler):
    """ Mobile menu pages """
    def get(self, action=None):
    	if action=='payment':
	        self.render('payment.html', **self.params)
