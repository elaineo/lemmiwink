import webapp2
import sys

# User Accounts
from Handlers.User.Account import *

from Pages.HomePage import *
from Pages.Mobile import *

sys.path.append('/Pages')

app = webapp2.WSGIApplication([('/', HomePage),
	webapp2.Route('/account/<action>', AccountHandler),
	webapp2.Route('/m/<action>', MobilePage)],
  debug=True)

