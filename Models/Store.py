from google.appengine.ext import ndb
import datetime
import logging
import json

# Global store variables
# When is it open?
##########

open_biz = datetime.time(hour=01)   # 6 pm
close_biz = datetime.time(hour=06)  # 11pm


class Store(ndb.Model):
    # If the store is open, adhere to weekday schedules
    location = ndb.StringProperty()
    open_biz = ndb.BooleanProperty(default=True)

    @classmethod
    def by_store(cls, store):
        return cls.query(cls.location==store).get()

    def get_schedule(self):
        wd = WeekDay.query(ancestor=self.key)
        return wd

    def by_day(self, day):
        wd = WeekDay.query(ancestor=self.key).filter(Weekday.weekday=day)
        return wd.get()

    def is_open(self, currtime):
        # currtime is in the format datetime.now()
        today = currtime.weekday()
        sched = self.by_day(today)
        now = now.time()
        if now < sched.time_open or now > sched.time_close:

class WeekDay(ndb.Model):
    weekday = ndb.IntegerProperty()
    # day of the week as an integer, where Monday is 0 and Sunday is 6
    time_open = ndb.DateTimeProperty()
    time_close = ndb.DateTimeProperty()
