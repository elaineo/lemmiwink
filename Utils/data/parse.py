import csv

m=[]

with open("cities.csv") as tsv:
    for l in csv.reader(tsv):
        city = {'city': l[0].split('[')[0],
                'lat' : l[1],
                'lon' : l[2] }
        m.append(city)
f = open('./citylist.py', 'w+')
print >> f, 'cities = '
print >> f, m        