review_msg = ' has left a review for you on Barnacle. Sign in to your account to check it out: http://www.gobarnacle.com/account'

review_sub = 'New Review on Barnacle'


resreceipt_txt = """
        Thank you for your reservation with Barnacle.\n
        If you have any questions or schedule changes, please contact us at 
        help@gobarnacle.com.\n\n
        You can access your reservation at any time by going to http://www.gobarnacle.com/account\n\n\n
        Reservation Details\n\n
        Origin:  %(locstart)s\n
        %(dropoffstr)s\n
        Destination: %(locend)s\n
        %(pickupstr)s\n
        %(delivby)s\n\n
        Driver: %(first_name)s
        %(ins_email)s\n\n
        Total: $%(rates)d
"""

resreceipt_anon = """
        Thank you for your reservation with Barnacle.\n
        If you have any questions or schedule changes, please contact us at 
        help@gobarnacle.com.\n\n
        Reservation Details\n\n
        Origin:  %(locstart)s\n
        Destination: %(locend)s\n
        %(delivby)s\n\n
        Total: $%(rates)d
"""