from google.appengine.ext import ndb
import dateutil.parser
from datetime import *
import re

def parse_date(indate):
    try:
        pdate = datetime.strptime(indate,'%m/%d/%Y')
    except:
        pdate = dateutil.parser.parse(indate)
    return pdate

def parse_rate(p):
    r = 0
    if p:
        non_decimal = re.compile(r'[^\d.]+')
        rate = non_decimal.sub('', p)
        if float(rate) >=0:
            r = int(round(float(rate)))
    return r

def parse_unit(unit):
    if unit:
        u = int(unit)
    else:
        u = 0
    return u

def parse_bool(unit):
    if unit:
        try:
            u = bool(int(unit))
        except:
            u = False
    else:
        u = False
    return u
