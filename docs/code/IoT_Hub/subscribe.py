#!/usr/bin/env python
# -*- coding: utf-8 -*-

import paho.mqtt.client as mqtt
import json

def on_connect(client, userdata, flags, rc):
    print('Connected with result code ' + str(rc))
    client.subscribe("test-iot-service", qos=0)

def on_message(client, userdata, msg):
    print(msg.topic + ' ' + str(msg.payload))
    print(json.loads(msg.payload.decode('utf8')))

if __name__ == '__main__':
    client = mqtt.Client(client_id="DeviceId-bx9ndve2g")
    client.on_connect = on_connect
    client.on_message = on_message
    client.username_pw_set("zengjf/sz_monitor_room", "QE0BHFvFnIkBRIaJtPYzo3m/63Esv5fzzMr9tYVOsHo=")
    client.subscribe("test-iot-service", qos=0)

    try:
        client.connect('zengjf.mqtt.iot.gz.baidubce.com', port=1883)
        client.loop_forever()
    except KeyboardInterrupt:
        client.disconnect()
