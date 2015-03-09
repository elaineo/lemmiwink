import logging
import urllib2

from google.appengine.api import mail


def send_alert(msg,subject):
    mail.send_mail_to_admins(sender='Lemmiwink Lemming <lemmi@golemmiwink.appspotmail.com>',
         subject=subject, body=msg)

    mail.send_mail(to='4254428566@txt.att.net', sender='Lemmiwink Lemming <lemmi@golemmiwink.appspotmail.com>',
        subject=subject, body=msg)
