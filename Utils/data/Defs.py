import os.path as path

DATA_DIR = path.dirname(path.realpath(__file__))
CITY_DB_PATH = path.join(DATA_DIR, 'GeoCityIP.dat')
CITYV6_DB_PATH = path.join(DATA_DIR, 'GeoCityv6.dat')

geocode_url = 'http://maps.googleapis.com/maps/api/geocode/json?'
directions_url = 'http://maps.googleapis.com/maps/api/directions/json?'
tz_url = 'https://maps.googleapis.com/maps/api/timezone/json?'
miles2m = 1609

signin_reg = '<ul class="button-group right fblogin"><li><a class="small button facebook">SIGN UP</a></li></ul>'
signin_pattern = r'<ul class="button-group right"><li><a class="small button facebook" href="%s">SIGN UP</a></li></ul>'

MV_geolat = 37.416
MV_geolon = -122.077
SG_geolat = 34.125
SG_geolon = -118.086
MV_string = '1601 N Shoreline Blvd, Mountain View, CA'
SG_string = '6936 N Ferncroft Ave, San Gabriel, CA'
ins_str = '<img src="/static/barnacle16.png" data-toggle="popover" data-content="Insured up to $500" class="info_ins">'
ins_str_email = 'Insured up to $500'
bank_str = '<img src="/static/img/icons/bankver.png" class="info_bank" data-toggle="popover" data-content="Bank Account Verified.">'

blank_img = '/static/img/blank.png'
blank_id = '5792498911805440'
blank_key = 'agtzfnAycHBvc3RhbHIXCxIKSW1hZ2VTdG9yZRiAgICA9IelCgw'
