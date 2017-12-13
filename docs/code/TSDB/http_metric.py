# -*- coding: UTF-8 -*-

import httplib, urllib
from datetime import datetime
from urllib import urlencode
from sign_sample import *
import time

# output send data
def patch_send():
    old_send= httplib.HTTPConnection.send
    def new_send( self, data ):
        print data
        return old_send(self, data) #return is not necessary, but never hurts, in case the library is changed
    httplib.HTTPConnection.send= new_send

patch_send()

# generate sign
credentials = BceCredentials("5c5b5ea289ed4c6db75c131e7eaf5715", "ca49ed4d426541e79f7da83fde4b9e28")
http_method = "GET"
path = "/v1/metric"
headers = {"host": "zengjf.tsdb.iot.gz.baidubce.com"
    # "content-type":"application/json; charset=utf-8",
    # "content-length":"0"
}
params = {}
timestamp = 0 # int(time.time())
headers_to_sign = {"host"}
# 这里一定要注意这里的headers_to_sign，不写会导致
#    403 Forbidden
#    {"requestId":"e5218a3e-1c8d-422c-ae2d-547c3ddfb01a","code":"AccessDenied","message":"Verify access forbidden"}
result = sign(credentials, http_method, path, headers, None, timestamp, 1800, headers_to_sign)
print result
print

# send request
hdrs = {
    "Content-type": "application/json; charset=utf-8",
    "Authorization": result,
    'Host': 'zengjf.tsdb.iot.gz.baidubce.com'
    # "content-length":"0"，
    # "x-bce-date": '%sT%sZ' % (datetime.datetime.utcfromtimestamp(timestamp).strftime("%Y%m%d"), datetime.datetime.utcfromtimestamp(timestamp).strftime("%H%M%S"))
}
conn = httplib.HTTPConnection("zengjf.tsdb.iot.gz.baidubce.com")
conn.request("GET", "/v1/metric", headers = hdrs)
response = conn.getresponse()
print response.status, response.reason
data = response.read()
print data
conn.close()


'''
>>> ================================ RESTART ================================
>>> 
bce-auth-v1/5c5b5ea289ed4c6db75c131e7eaf5715/2017-12-04T00:28:52Z/1800/host/52e4ca905caaff48bde728eaf42c9c6d39868ea12a20399164c9a10b57242b09

GET /v1/metric HTTP/1.1
Accept-Encoding: identity
Host: zengjf.tsdb.iot.gz.baidubce.com
Content-type: application/json; charset=utf-8
Authorization: bce-auth-v1/5c5b5ea289ed4c6db75c131e7eaf5715/2017-12-04T00:28:52Z/1800/host/52e4ca905caaff48bde728eaf42c9c6d39868ea12a20399164c9a10b57242b09


200 OK
{"metrics":["report"]}
>>>  
'''
