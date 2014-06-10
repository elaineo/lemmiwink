import logging
import jinja2
import os

jinja_env = jinja2.Environment(loader = jinja2.FileSystemLoader('templates/err'), autoescape = True)

def generate_error_handler(error_code, template_file):
    def error_handler(request, response, exception):
        t = jinja_env.get_template(template_file)
        response.write(t.render())
        response.set_status(error_code)
    return error_handler

# Bad Request
ErrorHandler400 = generate_error_handler(400, "err400.html")

# Forbidden
ErrorHandler403 = generate_error_handler(403, "err403.html")

# Not Found
ErrorHandler404 = generate_error_handler(404, "err404.html")

# Whatever I want
ErrorHandler409 = generate_error_handler(404, "err494.html")

# Request Timeout
ErrorHandler408 = generate_error_handler(408, "err408.html")

# Internal Server Error
ErrorHandler500 = generate_error_handler(500, "err500.html")
