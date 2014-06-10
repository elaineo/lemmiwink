from Handlers.BaseHandler import *
from Utils.PageUtils import *
import urlparse
import json

class HomePage(BaseHandler):
    """ Home page, first page shown """
    def get(self):
        self.render('home.html', **self.params)
