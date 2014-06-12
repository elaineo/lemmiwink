from Handlers.BaseHandler import *
from Models.ImageModel import *
from google.appengine.api import images
from Utils.data.Defs import blank_id, blank_key
import os
import logging

class ImagePage(BaseHandler):
    """ handles images """
    def get(self, id=None):
        if not id:
            return
        img = ImageStore.get_by_id(int(id))
        mode = self.request.get("mode")
        fakehash = self.request.get("key")
        if img and img.fakehash == fakehash:  # pass hash test to prevent scrapping     
            self.response.headers['Content-Type'] = "image/png"
            # return original / medium / small
            if mode == '': 
                self.write(img.image_medium)
            elif mode == 'original':
                self.write(img.image_orig)
            elif mode == 'small':
                self.write(img.image_small)
            else:
                self.write(img.image_small)
        else:
            self.error(404)

class ImageHandler(BaseHandler):
    def get(self, action=None, sender=None, receiver=None):  
        logging.info('email open: '+ action + ' from ' + sender + ' to '+receiver)
        self.response.headers['Content-Type'] = "image/png"
        img = ImageStore.get_by_id(int(blank_id))
        self.write(img.image_orig)