#!/usr/bin/env python
# -*- coding: utf-8 -*-

import paho.mqtt.client as mqtt
import json

mqttc = mqtt.Client(client_id="DeviceId-bx9ndve2")
mqttc.username_pw_set("zengjf/sz_monitor_room", "QE0BHFvFnIkBRIaJtPYzo3m/63Esv5fzzMr9tYVOsHo=")
mqttc.connect('zengjf.mqtt.iot.gz.baidubce.com', port=1883)
msg = {
    'pin': 17,
    'value': 10
}
msg = json.dumps(msg)

print(mqttc.publish('test-iot-service', payload=msg))
mqttc.loop(2)
