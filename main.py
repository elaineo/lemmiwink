import webapp2
import sys

# User Accounts
from Handlers.User.Account import *
from Handlers.User.Address import *
from Handlers.User.Cart import *
from Handlers.Image import *

from Pages.HomePage import *
from Pages.Mobile import *

# Catalog
from Handlers.Product.Listing import CatalogHandler
# Payment and Orders
from Handlers.User.Payment import PaymentHandler
from Handlers.Delivery import DeliveryHandler

#Admin
from Utils.Admin import AdminHandler
from Utils.Populate import PopulateHandler

sys.path.append('/Pages')

app = webapp2.WSGIApplication([('/', HomePage),
	webapp2.Route('/web', LargePage),
  webapp2.Route('/splash', SplashPage),
  # account info
  webapp2.Route('/account/<action>', AccountHandler),
	webapp2.Route('/address/<action>', AddressHandler),
  # product pages
  webapp2.Route('/cat', CatalogHandler),
  webapp2.Route('/cat/<key>', CatalogHandler),
  # checkout
  webapp2.Route('/cart/<action>', CartHandler),
  # payment
  webapp2.Route('/pay/<action>', PaymentHandler),
  # delivery
  webapp2.Route('/deliv/<key>', DeliveryHandler),
  # Image upload handlers
   webapp2.Route('/imgblob/<action>', handler=ImageBlobHandler),
   webapp2.Route('/imgserv/<action>', handler=ImageServeHandler),
   webapp2.Route('/imgdown/<resource>', handler=ImageDownloadHandler),
   webapp2.Route('/imgserv/<action>/<resource>', handler=ImageServeHandler),
   # Admin stuff
   webapp2.Route('/admin/<action>/<key>', AdminHandler),
   webapp2.Route('/pop/<action>', PopulateHandler),
	webapp2.Route('/m/<action>', MobilePage)],
  debug=True)

