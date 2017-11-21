#!/usr/bin/env python
# -*- coding: utf-8 -*-

import paho.mqtt.client as mqtt
import json

mqttc = mqtt.Client()
mqttc.connect('23.106.155.16', port=1883)
msg = {
    'pin': 17,
    'value': 10
}
msg = json.dumps(msg)

print(mqttc.publish('baisong', payload=msg))
mqttc.loop(2)
