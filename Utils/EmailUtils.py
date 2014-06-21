import logging
import urllib2

from google.appengine.api import mail


def send_alert(msg,subject):
    mail.send_mail(sender='Lemmiwink Lemming <lemmi@golemmiwink.appspotmail.com>',
        to ='help@lemmiwink.com', subject=subject, body=msg)

