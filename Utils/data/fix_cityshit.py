from google.appengine.api import urlfetch

import urllib2
import csv
from os import listdir
from os.path import isfile, join
from Utils.data.citylist import cities
import logging, json

geocode_url = 'http://maps.googleapis.com/maps/api/geocode/json?address='

def fix_cityshit():
    newc = []
    failed = []
    for c in cities:               
        loc = urllib2.quote(c['city'])
        geo_url = geocode_url +  'address=' + loc + '&sensor=false'     
        req = urlfetch.fetch(geo_url)
        results = json.loads(req.content)['results']
        cinfo={}
        try:
            cloc = results[0]
            lat=cloc['geometry']['location']['lat']
            lon=cloc['geometry']['location']['lng']
            cinfo['city'] = c['city']
            cinfo['lat'] = lat
            cinfo['lon'] = lon
            newc.append(cinfo)
        except:
            failed.append(c)
    logging.info(newc)
    logging.info(failed)

if __name__ == "__main__":
    main()
