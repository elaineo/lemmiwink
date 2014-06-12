from google.appengine.ext import ndb
from google.appengine.api import images
from Utils.UserUtils import *

class ImageStore(ndb.Model):
    """ Image datastore """
    image_orig = ndb.BlobProperty()
    image_medium = ndb.BlobProperty()
    image_small = ndb.BlobProperty()
    fakehash = ndb.StringProperty() # used to prevent scrapping
    date = ndb.DateTimeProperty(auto_now_add=True)
    def update(self, img):
        """ Automatially resize """
        i = images.Image(img)               
        h = float(i.height)
        w = float(i.width)

        # make the longest dim 600px
        if h < w:
            i.resize(width=min(600,int(w)))
            self.image_orig = i.execute_transforms()
            ratio = h/w
            i.crop(0.5 - 0.5*ratio, 0.0, 0.5 + 0.5*ratio, 1.0)
        else:
            i.resize(height=min(600,int(h)))
            self.image_orig = i.execute_transforms()
            ratio = w/h
            i.crop(0.0, 0.5 - 0.5*ratio, 1.0, 0.5 + 0.5*ratio)

        i.resize(360, 360)
        self.image_medium = i.execute_transforms()
        i.resize(100, 100)
        self.image_small = i.execute_transforms()
        
        # generate fakehash        
        self.fakehash = make_salt() + make_salt()

    @classmethod
    def new(cls, img):
        """ Return instance populated by img """
        i = ImageStore()
        i.update(img)        
        return i