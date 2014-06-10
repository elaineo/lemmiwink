import webapp2
import jinja2
import os
import logging
import urlparse
from google.appengine.api import users
from Utils.UserUtils import *
from Models.User.Account import *
from Utils.PageUtils import *
from Utils.data.Defs import signin_reg, blank_img, signin_pattern

jinja_env = jinja2.Environment(loader = jinja2.FileSystemLoader('templates'), autoescape = True)

class BaseHandler(webapp2.RequestHandler):
    """ BaseHandler, generic helper functions and user handling """
    current_user_key = None
    user_prefs = None # preferences for logged in user

    def write(self, *a, **kw):
        self.response.out.write(*a, **kw)

    def render_str(self, template, **params):
        """ render jinja tempalte """
        t = jinja_env.get_template(template)
        return t.render(params)

    def render(self, template, **kw):
        """ render and write """
        if len(kw) == 0:
            self.write(self.render_str(template, **self.params))
        else:
            self.write(self.render_str(template, **kw))

    def initialize(self, *a, **kw):
        """ called every time """
        webapp2.RequestHandler.initialize(self, *a, **kw)
        # webapp2 does not handle utf-8json encoding from facebook
        if self.request.charset == 'utf-8json':
            self.request.charset = 'utf-8'
        self.params = {} # parameters to pass to template renderer
        self.set_current_user()

    def set_secure_cookie(self, name, val):
        """ set cookie """
        cookie_val = make_secure_val(val)
        self.response.headers.add_header('Set-Cookie',
                '%s=%s; Path=/' % (name, cookie_val))

    def read_secure_cookie(self, name):
        """ read cookie """
        cookie_val = self.request.cookies.get(name)
        return cookie_val and check_secure_val(cookie_val)

    def login(self, email):
        self.set_secure_cookie('user_id', str(email))

    def logout(self):
        """ logout by deleting cookie """
        self.response.headers.add_header('Set-Cookie', 'user_id=; Path=/')

    def set_current_user(self):
        email = self.read_secure_cookie('user_id')
        if email:
            up = UserAccounts.by_userid(email)
            if up:
                self.user_prefs = up
                self.current_user_key = up.key
        # I forgot what this stuff was, don't care right now
        elif self.request.get('login_token'):
            user = UserAccounts.by_login_token(self.request.get('login_token'))
            if user:
                self.user_prefs = UserAccounts.by_email(user.email)
                self.current_user_key = self.user_prefs.key
