from Utils.data.Defs import signin_reg
from google.appengine.api import users

                
def gen_account_links(user_prefs):
    al = ('<a href="/account">Dashboard</a><br>  <a href="/signout" id="signoutFB">Logout</a>' )
    return al
    