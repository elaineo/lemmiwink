from google.appengine.ext import ndb
from Utils.RouteUtils import RouteUtils
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
    
def get_search_json(data,pt):
    ptlat = data.get(pt+'lat')
    ptlon = data.get(pt+'lon')
    ptstr = data.get(pt)
    if not ptlat or not ptlon:            
        if ptstr:
            ptg = RouteUtils.getGeoLoc(ptstr)[0]
        else:
            ptg = None
    else:
        ptg = ndb.GeoPt(lat=ptlat,lon=ptlon)    
    return ptg, ptstr              