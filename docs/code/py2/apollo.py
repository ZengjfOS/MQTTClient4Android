#!/usr/bin/python

import paho.mqtt.client as mqtt
import time

def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc)+'\n')
    
def on_message(client, userdata, msg):
    print(msg.topic+" "+str(msg.payload)+'\n')

client1 = mqtt.Client()
client1.username_pw_set("zengjf", "123456")   #username: marshal | password: 123456
client1.on_connect = on_connect
client1.on_message = on_message

client2 = mqtt.Client()
client2.username_pw_set("admin", "123456")   #username: admin | password: password
client2.on_connect = on_connect
client2.on_message = on_message

HOST = "23.106.155.16"    #IP address of broker

client1.connect_async(HOST,61613,60)
client2.connect_async(HOST,61613,60)
client1.loop_start()  #client1 runs a thread at background
client2.loop_start()  #client2 runs a thread at background

for i in range(30):
    time1 = time.time()
    client1.subscribe('manipulated')  #client1 subcribes a topic 'manipulated'
    client2.subscribe('position')   #client2 subcribes a topic 'position'
    
    client2.publish('manipulated',i*0.02) #client2 publishes topic 'manipulated' with content 'i*0.02'
    client1.publish('position',i)  #client1 publishes topic 'position' with content 'i'
    time2 = time.time()
    interval = time2-time1     #interval in each data exchange
    print 'Interval '+str(i)+': '+str(interval)+'\n'
    time.sleep(1)

#stop threads in background
client1.loop_stop()
client2.loop_start()
