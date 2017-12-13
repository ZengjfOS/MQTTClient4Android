# -*- coding: UTF-8 -*-

import httplib, urllib
from datetime import datetime
from urllib import urlencode
from sign_sample import *
import time
import json
import random

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
result = sign(credentials, http_method, path, headers, params, timestamp, 1800, headers_to_sign)
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

metrics = json.loads(data)
print metrics["metrics"][0]
print

# generate sign
credentials = BceCredentials("5c5b5ea289ed4c6db75c131e7eaf5715", "ca49ed4d426541e79f7da83fde4b9e28")
http_method = "POST"
path = "/v2/tokens"
print path
headers = {"host": "viz.baidubce.com"
    # "content-type":"application/json; charset=utf-8",
    # "content-length":"0"
}

params = {
}

timestamp = 0 # int(time.time())
headers_to_sign = {"host"}
# 这里一定要注意这里的headers_to_sign，不写会导致
#    403 Forbidden
#    {"requestId":"e5218a3e-1c8d-422c-ae2d-547c3ddfb01a","code":"AccessDenied","message":"Verify access forbidden"}
result = sign(credentials, http_method, path, headers, params, timestamp, 1800, headers_to_sign)
print result
print

# send request
query_data = json.dumps(
{
    "ttl": 3600
}
)
hdrs = {
    "Content-type": "application/json; charset=utf-8",
    "Authorization": result,
    'Host': 'viz.baidubce.com'
    # "content-length":"0"，
    # "x-bce-date": '%sT%sZ' % (datetime.datetime.utcfromtimestamp(timestamp).strftime("%Y%m%d"), datetime.datetime.utcfromtimestamp(timestamp).strftime("%H%M%S"))
}
conn = httplib.HTTPConnection("viz.baidubce.com")
print
print path, query_data
print

conn.request("POST", path, query_data, headers = hdrs)
response = conn.getresponse()
print
print response.status, response.reason
print

data = response.read()
print data
conn.close()
