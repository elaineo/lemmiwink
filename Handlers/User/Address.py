from google.appengine.ext import ndb
from Handlers.BaseHandler import *
from Models.User.Account import *
from Models.User.Address import *
import logging
import json

class AddressHandler(BaseHandler):
    """ Create addresses """
    def get(self, action=None):
        if not self.user_prefs: # if user is not logged in, redirect
            self.redirect("/signup")

    def post(self, action=None):
        if not self.user_prefs: # if user is not logged in, redirect
            self.redirect("/signup")
        if action=='create':
            self.__create_new()
        if action=='update':
            self.__create_new(True)

    def __create_new(self,update=False):
        self.response.headers['Content-Type'] = "application/json"
        data = json.loads(self.request.body)
        logging.info(data)
        # retrieve information
        name = data.get('name')
        tel = data.get('tel')
        address = data.get('address')
        apt = data.get('apt')
        city = data.get('city')
        state = data.get('state')
        zipcode = data.get('zip')
        lat = data.get('lat')
        lon = data.get('lon')
        mm={'error':None}
        if not name or not tel or not zipcode:
            mm['error']="Please complete all fields."

        u = self.user_prefs
        u.fullname = name
        u.tel = tel

        if update and u.addr_deliv:
            new_addr = u.addr_deliv.get()
        else:
            new_addr = Address()
        new_addr.street = address
        new_addr.apt = apt
        new_addr.city = city
        new_addr.state = state
        new_addr.zipcode = zipcode
        if lat and lon:
            locpt = ndb.GeoPt(lat=lat, lon=lon)
            new_addr.locpt = locpt
        new_addr.put()
        if not update or not u.addr_deliv:
            u.addr_deliv = new_addr.key
        u.put()

        if mm['error'] is not None:
            mm['status'] = 'error'
            self.write(json.dumps(mm))
            return
        else:
            mm['status'] = 'ok'
            self.write(json.dumps(mm))
            return
