import urllib2
import logging
from bs4 import BeautifulSoup

def fetch_profile(fbid):
    # get user profile
    prof_url = 'http://www.zimride.com/user/profile?user='+fbid
    opener = urllib2.build_opener()
    opener.addheaders.append(('Cookie', 'PHPSESSID=bg1njpm133j74miqkd4nieulq3'))
    f = opener.open(prof_url)
    soup = BeautifulSoup(f)
    label = soup.find("div", {"class":"label"})
    url = label.find('a')['href']
    return url
    
def fetch_routes(url):
    opener = urllib2.build_opener()
    # this isn't a good permanent solution. Will have to update... daily?
    opener.addheaders.append(('Cookie', 'PHPSESSID=bg1njpm133j74miqkd4nieulq3'))
    f = opener.open('http://www.zimride.com/users/1744333')
    soup = BeautifulSoup(f)
    ride_list = soup.find("div", {"class":"ride_list"})
    links = ride_list.find_all('a')
    routes = []
    for a in links:
        r = {}
        r['link'] = a['href']
        tofrom = str(a.find("span", {"class":"inner"})).replace('<','>').split('>')
        r['start'] = tofrom[2].replace("\n","").lstrip()
        r['dest'] = tofrom[6].replace("\n","").rstrip()
        routes.append(r)
    return routes