from Handlers.BaseHandler import *

class CloseHelper(BaseHandler):
    def get(self):   
        self.render('suicide.html', **self.params)