#!/usr/bin/env python
# -*- coding: utf-8 -*-

import paho.mqtt.client as mqtt
import json
import time
import random
import time

mqttc = mqtt.Client()
mqttc.username_pw_set("zengjf/sz_monitor_room", "QE0BHFvFnIkBRIaJtPYzo3m/63Esv5fzzMr9tYVOsHo=")
mqttc.connect('zengjf.mqtt.iot.gz.baidubce.com', port=1883)

while True:

    msg = {
        "metric":"report",
        "_timestamp": int(time.time()),
        "_value": random.randint(1, 30),
        "id": "70:00:83:24:38:85", 
        "machine": "arm",
        "os": "linux",
        "categories": "data", 
        "type": "temperature"
    }
    msg = json.dumps(msg)
    print(mqttc.publish('test-iot-service', payload=msg))
    mqttc.loop(2)
    time.sleep(5)
