import logging
import json
import urllib
from datetime import *
from google.appengine.ext import ndb
import google.appengine.api.images
from Handlers.BaseHandler import *
from google.appengine.ext import blobstore
from google.appengine.ext.webapp import blobstore_handlers


# Image Uploading
# The blobstore uploading requires the construction of a url to be submitted as
# part of a multiform form. To be compatible with the iOS app, we need to return
# the upload url which the iOS can POST to. The iOS also needs be returned the
# url of the image
# 1) ask for upload url (/imgserv/url)
# 2) post multiform to upload url (/imgserv/upload)
# 3) redirect to handler which returns a json response with image url (/imgserv/success/<resource>)
# 4) return image url in json (/imgserv/img/<resource>)
# ... then iOS posts image url with lat and long


class ImageServeHandler(BaseHandler):
    def get(self, action=None, resource=None):
        if action=='url':
            upload_url = blobstore.create_upload_url('/imgblob/upload')
            self.response.headers['Content-Type'] = "application/json"
            response = {'status':'ok'}
            response['upload_url'] = upload_url
            self.write(json.dumps(response))
        if resource and action=='success':
            self.response.headers['Content-Type'] = "application/json"
            #url = images.get_serving_url(blobstore.BlobKey(blob_key))
            url = '%s/imgserv/img/%s' % (www_home, resource)
            self.write(json.dumps({'url' : url}))
        elif resource and action=='img':
            resource = str(urllib.unquote(resource))
            blob_info = blobstore.BlobInfo.get(resource)
            self.send_blob(blob_info)

    def post(self, action=None):
        if action=='upload':
            picture = self.request.get("file")

            # Write new picture to blob
            content_type, body = BlobstoreUpload.encode_multipart_formdata(
                [], [('file', name, image)])
            response = urlfetch.fetch(
                url=blobstore.create_upload_url(self.uri_for('blobstore-upload')),
                payload=body,
                method=urlfetch.POST,
                headers={'Content-Type': content_type},
                deadline=30
            )
            logging.info(response.content)
            blob_key = response.content

class ImageBlobHandler(blobstore_handlers.BlobstoreUploadHandler):
    def post(self, action=None):
        if action=='upload':
            upload_files = self.get_uploads('file')  # 'file' is file upload field in the form
            blob_info = upload_files[0]
            self.redirect('%s/imgserv/success/%s' % (www_home, blob_info.key()))

class BlobstoreUpload(blobstore_handlers.BlobstoreUploadHandler):
    def post(self):
        upload_files = self.get_uploads('file')
        blob_info = upload_files[0]
        return self.response.write(blob_info.key())

    @classmethod
    def encode_multipart_formdata(cls, fields, files, mimetype='image/png'):
        """
        Args:
          fields: A sequence of (name, value) elements for regular form fields.
          files: A sequence of (name, filename, value) elements for data to be
            uploaded as files.
        Returns:
          A sequence of (content_type, body) ready for urlfetch.
        """
        boundary = 'paLp12Buasdasd40tcxAp97curasdaSt40bqweastfarcUNIQUE_STRING'
        crlf = '\r\n'
        line = []
        for (key, value) in fields:
            line.append('--' + boundary)
            line.append('Content-Disposition: form-data; name="%s"' % key)
            line.append('')
            line.append(value)
        for (key, filename, value) in files:
            line.append('--' + boundary)
            line.append('Content-Disposition: form-data; name="%s"; filename="%s"' % (key, filename))
            line.append('Content-Type: %s' % mimetype)
            line.append('')
            line.append(value)
        line.append('--%s--' % boundary)
        line.append('')
        body = crlf.join(line)
        content_type = 'multipart/form-data; boundary=%s' % boundary
        return content_type, body
