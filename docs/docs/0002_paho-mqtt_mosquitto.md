# paho-mqtt + mosquitto

## 一、install paho-mqtt/mosquitto

```Shell
$ sudo apt-get install python-pip python-dev build-essential 
$ sudo pip install --upgrade pip 
$ sudo pip install paho-mqtt
$ sudo apt-get install mosquitto
$ sudo apt-get install mosquitto-clients
```

## 二、start mosquitto

`/usr/sbin/mosquitto -c /etc/mosquitto/mosquitto.conf -d`

## 三、client.py

```Python
#!/usr/bin/env python
# -*- coding: utf-8 -*-

import paho.mqtt.client as mqtt
import json

def on_connect(client, userdata, flags, rc):
    print('Connected with result code ' + str(rc))
    client.subscribe('baisong')


def on_message(client, userdata, msg):
    print msg.topic + ' ' + str(msg.payload)
    print json.loads(msg.payload)

if __name__ == '__main__':
    client = mqtt.Client()
    client.on_connect = on_connect
    client.on_message = on_message

    try:
        client.connect('127.0.0.1', port=1883)
        client.loop_forever()
    except KeyboardInterrupt:
        client.disconnect()
```

## 四、server.py

```Python
#!/usr/bin/env python
# -*- coding: utf-8 -*-

import paho.mqtt.client as mqtt
import json

mqttc = mqtt.Client()
mqttc.connect('127.0.0.1', port=1883)
msg = {
    'pin': 17,
    'value': 10
}
msg = json.dumps(msg)

print mqttc.publish('baisong', payload=msg)
mqttc.loop(2)
```

## 五、程序运行输出

```Shell
root@localhost:~/mqtt# /usr/sbin/mosquitto -c /etc/mosquitto/mosquitto.conf &
[1] 8161
root@localhost:~/mqtt# python client.py &
[2] 8162
root@localhost:~/mqtt# Connected with result code 0

root@localhost:~/mqtt# python server.py
(0, 1)
baisong {"value": 10, "pin": 17}
{u'pin': 17, u'value': 10}
root@localhost:~/mqtt#

```
