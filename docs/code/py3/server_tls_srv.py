#!/usr/bin/env python
# -*- coding: utf-8 -*-

import paho.mqtt.client as mqtt
import json
import ssl

mqttc = mqtt.Client()
mqttc.username_pw_set("zengjf", "zengjf")
mqttc.tls_set("m2mqtt_srv.crt", certfile=None, keyfile=None, cert_reqs=ssl.CERT_REQUIRED,
    tls_version=ssl.PROTOCOL_TLSv1, ciphers=None)
mqttc.connect('23.106.155.16', port=8883)
msg = {
    'pin': 17,
    'value': 10
}
msg = json.dumps(msg)

print(mqttc.publish('zengjf/index.html', payload=msg))
mqttc.loop(2)
