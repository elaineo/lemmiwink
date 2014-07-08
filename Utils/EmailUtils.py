import logging
import urllib2

from google.appengine.api import mail


def send_alert(msg,subject):
    mail.send_mail_to_admins(sender='Lemmiwink Lemming <lemmi@golemmiwink.appspotmail.com>',
         subject=subject, body=msg)

