from datetime import *
import dateutil.parser
from google.appengine.ext import ndb
from google.appengine.api import search
from google.appengine.api import taskqueue

from Handlers.BaseHandler import *
from Models.ImageModel import ImageStore
from Models.Message import Message
from Models.Post.Request import *
from Models.Post.Route import *
from Models.Post.OfferRoute import *
from Models.Post.OfferRequest import *
from Models.Post.Review import *
from Models.Message import *
from Models.User.Account import *
from Models.User.Driver import *
from Models.Launch.CLModel import *
from Utils.data.fakedata import *
from Utils.data.citylist import *
from Utils.SearchUtils import *
from Utils.SearchDocUtils import *
from Utils.SearchScraped import *
from Utils.RouteUtils import *

import json
import random
import logging

class TestUtils(BaseHandler):
    def get(self):
        self.render('post/submap.html', **self.params)
        
class DebugUtils(BaseHandler):
    def get(self, action=None):
        if action=='clearall':
            delete_all_in_index(ZIM_INDEX)
            # ndb.delete_multi( ZimModel.query().fetch(keys_only=True))
            # delete_all_in_index(ROUTE_INDEX)
            # delete_all_in_index(REQUEST_INDEX)
        elif action=='clearexp':
            clean_index(REQUEST_INDEX)
            clean_index(ROUTE_INDEX)
        elif action=='qtask':
            taskqueue.add(url='/debug/clearusers')
        elif action=='cities':
            delete_all_in_index(CITY_INDEX)
            for c in cities:
                point = ndb.GeoPt(c['lat'],c['lon'])
                create_city_doc(c['city'],point)
            self.write('cities created')
        elif action=='clearusers':
            data = UserPrefs.query()
            for u in data:
                dups = UserPrefs.query(UserPrefs.email==u.email).fetch()
                if len(dups)>1:
                    dups[-1].key.delete()                
        elif action=='clearcl':
            data = CLModel.query()
            for d in data:
                d.key.delete()
            delete_all_in_index(CL_INDEX)                               
            self.write('cl stuff gone.')       
        elif action=='createroutes':
            drivers = UserPrefs.query()
            drivers = [d.key for d in drivers]
            i5cities = [{'city': 'Los Angeles', 'lat': 34.0522342, 'lon': -118.2436849}, {'city': 'San Diego', 'lat': 32.9947953, 'lon': -116.924239}, {'city': 'San Jose', 'lat': 37.3393857, 'lon': -121.8949555}, {'city': 'Sacramento', 'lat': 38.5815719, 'lon': -121.4943996}, {'city': 'Long Beach', 'lat': 33.768321, 'lon': -118.1956168},  {'city': 'Bakersfield', 'lat': 35.3732921, 'lon': -119.0187125}, {'city': 'Santa Ana', 'lat': 33.7455731, 'lon': -117.8678338}, {'city': 'Reno', 'lat': 39.5296329, 'lon': -119.8138027}, {'city': 'Fremont', 'lat': 37.5482697, 'lon': -121.9885719}, {'city': 'Tacoma', 'lat': 47.2528768, 'lon': -122.4442906}, {'city': 'Oxnard', 'lat': 34.1975048, 'lon': -119.1770516}, {'city': 'Glendale', 'lat': 34.1425078, 'lon': -118.255075}, {'city': 'Oceanside', 'lat': 33.1958696, 'lon': -117.3794834}, {'city': 'Santa Rosa', 'lat': 38.4404674, 'lon': -122.7144314}, {'city': 'Eugene', 'lat': 44.0520691, 'lon': -123.0867536}, {'city': 'Pasadena', 'lat': 34.1477849, 'lon': -118.1445155},  {'city': 'Santa Clara', 'lat': 37.3541079, 'lon': -121.9552356}, {'city': 'Seattle', 'lat': 47.6062095, 'lon': -122.3320708},  {'city': 'Portland', 'lat': 45.5234515, 'lon': -122.6762071},{'city': 'Oakland', 'lat': 37.8043637, 'lon': -122.2711137}]
            today = datetime.today()
            nextmonth = today + timedelta(weeks=4)
            for i in range(0,20):
                d = random.choice(drivers)
                r0 = random.choice(i5cities)
                r1 = random.choice(i5cities)
                rr = RepeatRoute()
                rr.period = random.randint(0,1)
                rr.dayweek = [random.randint(0,6)]
                rr.weekmonth = [random.randint(1,4)]
                capacity=random.choice([0,1,4])
                start = ndb.GeoPt(r0['lat'], r0['lon'])
                dest =  ndb.GeoPt(r1['lat'], r1['lon'])
                r = Route(parent=d, capacity=capacity, repeatr=rr, 
                delivstart=today, delivend=nextmonth, start=start, dest=dest,
                locstart=r0['city'], locend=r1['city'])
                try:
                    r.pathpts, dist = getPath(start,dest)
                    r.put()
                    create_route_doc(r.key.urlsafe(), r)
                except:
                    logging.error('failed on '+r0['city'] + ' to ' + r1['city'])
                    continue
        elif action=='createrequests':

            users = UserPrefs.query()
            users = [u.key for u in users]
            i5cities = [{'city': 'Los Angeles', 'lat': 34.0522342, 'lon': -118.2436849}, {'city': 'San Diego', 'lat': 32.9947953, 'lon': -116.924239}, {'city': 'San Jose', 'lat': 37.3393857, 'lon': -121.8949555}, {'city': 'Sacramento', 'lat': 38.5815719, 'lon': -121.4943996}, {'city': 'Long Beach', 'lat': 33.768321, 'lon': -118.1956168},  {'city': 'Bakersfield', 'lat': 35.3732921, 'lon': -119.0187125}, {'city': 'Santa Ana', 'lat': 33.7455731, 'lon': -117.8678338}, {'city': 'Reno', 'lat': 39.5296329, 'lon': -119.8138027}, {'city': 'Fremont', 'lat': 37.5482697, 'lon': -121.9885719}, {'city': 'Tacoma', 'lat': 47.2528768, 'lon': -122.4442906}, {'city': 'Oxnard', 'lat': 34.1975048, 'lon': -119.1770516}, {'city': 'Glendale', 'lat': 34.1425078, 'lon': -118.255075}, {'city': 'Oceanside', 'lat': 33.1958696, 'lon': -117.3794834}, {'city': 'Santa Rosa', 'lat': 38.4404674, 'lon': -122.7144314}, {'city': 'Eugene', 'lat': 44.0520691, 'lon': -123.0867536}, {'city': 'Pasadena', 'lat': 34.1477849, 'lon': -118.1445155},  {'city': 'Santa Clara', 'lat': 37.3541079, 'lon': -121.9552356}, {'city': 'Seattle', 'lat': 47.6062095, 'lon': -122.3320708},  {'city': 'Portland', 'lat': 45.5234515, 'lon': -122.6762071},{'city': 'Oakland', 'lat': 37.8043637, 'lon': -122.2711137}]
            today = datetime.today()
            nextmonth = today + timedelta(weeks=4)
            for i in range(0,20):

                u = random.choice(users)
                r0 = random.choice(i5cities)
                r1 = random.choice(i5cities)
                capacity=random.choice([0,1,4])
                start = ndb.GeoPt(r0['lat'], r0['lon'])
                dest = ndb.GeoPt(r1['lat'], r0['lon'])
                reqStatsObject = ReqStats(views=0, sugg_price=50)

                myRequest = Request(parent=u,capacity=capacity, delivby=nextmonth, start=start, dest=dest, locstart=r0['city'], locend=r1['city'], stats=reqStatsObject)
                try:
                    myRequest.put()
                except:
                    logging.error('failed to seed database with request: '+r0['city'] + ' to ' + r1['city'])
                    continue

        elif action=='createreviews':  
            users = UserPrefs.query().fetch()
            for r in fakereviews:  
                ukey0 = random.choice(users).key
                ukey1 = random.choice(users).key
                p = Review(sender=ukey0, receiver=ukey1, rating=5, content=r)
                p.put()            
            for r in fakerevE:
                ukey = random.choice(users).key
                receiver = UserPrefs.by_email('elaine.ou@gmail.com')
            self.write('requests created.')     
        elif action=='createcl':   
            # need to make a dummy call because strptime has problems with multithreading
            datetime.strptime('2012-01-01', '%Y-%m-%d')
            self.render('share/cldata.html', **self.params)
        # elif action=='reset':
            # routes = BarnacleModel.query()
            # for r in routes:
                # stats = UserStats(code='elaine')
                # q = UserPrefs(about=r.about, account_type='fb', email='help@gobarnacle.com', first_name=r.first_name, last_name=r.last_name, location=r.fblocation, userid=r.userid, stats=stats, img_id=r.img_id)
                # q.put()

            # routes = ExpiredOffer.query()
            # for r in routes:
                # try:
                    # rn = OfferRoute(parent=r.sender, route=r.route, sender=r.receiver, driver=r.sender, price=r.price, deliverby=r.deliverby, locstart=r.locstart, locend=r.locend, confirmed=r.confirmed, dead=1)
                    # rn.put()
                    # r.key.delete()
                # except:
                    # continue
    
    def post(self, action=None):        
        if action=='createcl':
            d = json.loads(self.request.body)
            email = d['email']
            time = d['time']
            subj = d['subj']
            url = d['url']
            details = d['details']
            locstart = d['start']
            locend = d['dest']
            date = d['date']
            startlat = d['startlat']
            startlng = d['startlng']
            destlat = d['destlat']
            destlng = d['destlng']
            try:
                rtdate = d['rtdate']
            except:
                rtdate = None
            cl = CLModel(email = email, 
                posted = datetime.fromtimestamp(int(time) // 1000),
                clurl = url, delivend = datetime.strptime(date,'%m/%d/%Y'),
                locstart = locstart, locend = locend, 
                start = ndb.GeoPt(lat=startlat, lon=startlng),
                dest = ndb.GeoPt(lat=destlat, lon=destlng),
                details = details)
            if rtdate:
                cl2 = CLModel(email = email, 
                posted = datetime.fromtimestamp(int(time) // 1000),
                clurl = url, delivend = datetime.strptime(rtdate,'%m/%d/%Y'),
                locstart = locend, locend = locstart, 
                dest = ndb.GeoPt(lat=startlat, lon=startlng),
                start = ndb.GeoPt(lat=destlat, lon=destlng),
                details = details)
                #try:
                cl2.put()
                create_pathpt_doc(cl2.key.urlsafe(), cl2)
                # except:
                    # response = {'status': 'fail'}
            #try:
            cl.put()
            create_pathpt_doc(cl.key.urlsafe(), cl)
            response = { 'status': 'ok' }
            # except:
                # response = {'status': 'fail'}
                # logging.error(cl)
            self.response.headers['Content-Type'] = "application/json"
            self.write(json.dumps(response))            
        elif action=='createz':
            d = json.loads(self.request.body)
            url = d['url']
            fbid = d['fbid']
            details = d['details']
            locstart = d['start']
            locend = d['dest']
            try:
                date = fix_zdate(d['date'])
            except:
                return
            startlat = d['startlat']
            startlng = d['startlng']
            destlat = d['destlat']
            destlng = d['destlng']
            
            try:
                rtdate = fix_zdate(d['rtdate'])
                details = d['date'] + ', ' + d['rtdate'] + '\n' + details
            except:
                rtdate = None
                details = d['date'] + '\n' + details
            z = ZimModel(fbid = fbid, 
                clurl = url, delivend = date,
                locstart = locstart, locend = locend, 
                start = ndb.GeoPt(lat=startlat, lon=startlng),
                dest = ndb.GeoPt(lat=destlat, lon=destlng),
                details = details)
            z.put()
            if z.distance > 160900:
                create_zim_doc(z.key.urlsafe(), z) 
            else:
                z.key.delete()
                rtdate = None
            if rtdate:
                z2 = ZimModel(fbid = fbid, 
                clurl = url, delivend = rtdate,
                locstart = locend, locend = locstart, 
                dest = ndb.GeoPt(lat=startlat, lon=startlng),
                start = ndb.GeoPt(lat=destlat, lon=destlng),
                details = details)
                # try:
                z2.put()
                create_zim_doc(z2.key.urlsafe(), z2)
                # except:
                    # response = {'status': 'fail'}
            # try:
            response = { 'status': 'ok' }
            # except:
                # response = {'status': 'fail'}
                # logging.error(z)
            self.response.headers['Content-Type'] = "application/json"
            self.write(json.dumps(response))          
        else:
            return
            
            
def fix_zdate(date):
    d = date.split(',')
    return dateutil.parser.parse(d[-1])
    
def delete_all_in_index(index_name):
    """Delete all the docs in the given index."""
    doc_index = search.Index(name=index_name)

    while True:
        # Get a list of documents populating only the doc_id field and extract the ids.
        document_ids = [document.doc_id
                        for document in doc_index.get_range(ids_only=True)]
        if not document_ids:
            break
        # Delete the documents for the given ids from the Index.
        doc_index.delete(document_ids)
        
def clean_index(index_name):
    """Delete all the docs without corresponding datastore entries."""
    doc_index = search.Index(name=index_name)

    # Get a list of documents populating only the doc_id field and extract the ids.
    document_ids = [document.doc_id
                    for document in doc_index.get_range(ids_only=True)]
    for doc in document_ids:
        if doc.endswith('_RT'):
            key = doc[:-3]
        else:
            key = doc
        r = ndb.Key(urlsafe=key).get()
        if not r:
            doc_index.delete(doc)
            logging.info(doc)