import re
import hashlib
import random
import hmac
import string

# validation
USER_RE = re.compile(r"^[a-zA-Z0-9_-]{3,20}$")
PW_RE = re.compile(r"^.{3,20}$")
ZC_RE = re.compile(r"^[0-9]{5}$")
TEL_RE = re.compile(r"^[0-9]{10}$")
AG_RE = re.compile(r"^[0-9]{2,3}$")
EM_RE = re.compile(r"^[\S]+@[\S]+\.[\S]+$")
# hashing
SECRET = 'poop'      

#User Agents
AGENT_IOS = str('Barnacle/1.0 CFNetwork/')
AGENT_ANDROID = str('android-async-http')

# validation
def valid_username(username):
    return USER_RE.match(username)

def valid_pw(password):
    return PW_RE.match(password)

def valid_email(email):
    return EM_RE.match(email)    

def valid_zipcode(zipcode):
    """ 5-digit zipcode """
    return ZC_RE.match(zipcode)    

def valid_tel(tel):
    """ 10-digit number """
    clean = re.sub("[^0-9]", "", tel)
    if len(clean) == 10:
        return clean
    else:
        return None

def valid_age(age):
    """ 2 to 3 digit age """ # nobody under 10
    return AG_RE.match(age)    



# password hashing and salting
def make_salt():
    return ''.join(random.choice(string.letters) for x in xrange(5))

def make_pw_hash(name, pw, salt = None):     
    if not salt:
        salt = make_salt()
    h = hashlib.sha256(name + pw + salt).hexdigest()
    return '%s,%s' % (salt, h)

def valid_pwhash(name, password, h):
    salt = h.split(',')[0]
    return h == make_pw_hash(name, password, salt)

# cookie hashing
def make_secure_val(val):
    return '%s|%s' % (val, hmac.new(SECRET, val).hexdigest())

def check_secure_val(secure_val):
    val = secure_val.split('|')[0]
    if secure_val == make_secure_val(val):
        return val
