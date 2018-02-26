# -*- coding: UTF-8 -*-

import httplib, urllib
from datetime import datetime
from urllib import urlencode
import time
import json
import random

# output send data
def patch_send():
    old_send= httplib.HTTPConnection.send
    def new_send( self, data ):
        print(data)
        return old_send(self, data) #return is not necessary, but never hurts, in case the library is changed
    httplib.HTTPConnection.send= new_send

patch_send()

# send request
query_data = json.dumps(
{
    "ttl": 36000
}
)
hdrs = {
    "Content-type": "application/json; charset=utf-8",
}
conn = httplib.HTTPConnection("127.0.0.1:8080")
path = "/tokens"
print
print(path, query_data)
print

conn.request("POST", path, query_data, headers = hdrs)
response = conn.getresponse()
print
print(response.status, response.reason)
print

data = response.read()
print(data)
conn.close()
