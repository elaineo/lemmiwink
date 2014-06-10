complreq_txt = """
        Dear %(first_name)s,\n\n
        You recently started a request to ship through Barnacle.  We would like to advertise this to our fleet of drivers, but we need you to complete your request.  You can finish where you left off at http://www.gobarnacle.com%(req_url)s.\n\n

        Every day, we are proud to help people like you ship goods affordably with our friendly network of drivers.  If you have any questions about best practices in shipping through Barnacle, please don't hesitate to reply directly to this email.\n\n
        
        Thanks for using Barnacle!\n\n
"""


addcc_txt = """
        Dear %(first_name)s,\n\n
        You recently posted a request to ship through Barnacle. To protect our drivers, we require that requests be associated with a valid form of payment. You can add your billing information through your dashboard here:  https://www.gobarnacle.com/account.\n\n

        As a reminder, you will not be charged until a driver accepts your request, and the payment will not be released to the driver until you confirm delivery. If you have any questions, please reply directly to this email.\n\n
        Thanks for using Barnacle!\n\n
"""

addcc_sub = "Reminder: Add a payment account"
complreq_sub = "Reminder: Complete your delivery request"