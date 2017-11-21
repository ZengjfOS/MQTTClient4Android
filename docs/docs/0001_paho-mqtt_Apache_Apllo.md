# paho-mqtt + Apache Apllo

## 一、Apllo Download

`wget http://apache.website-solution.net/activemq/activemq-apollo/1.7.1/apache-apollo-1.7.1-unix-distro.tar.gz`

## 二、help

```
root@localhost:~/apache-apollo-1.7.1/bin# ./apollo
usage: apollo [--log <log_level>] <command> [<args>]

The most commonly used apollo commands are:
    create           creates a new broker instance
    disk-benchmark   Benchmarks your disk's speed
    help             Display help information
    version          Displays the broker version

See 'apollo help <command>' for more information on a specific command.
```

## 三、create broker

```
root@localhost:~/apache-apollo-1.7.1/bin# ./apollo create mybroker
Creating apollo instance at: mybroker
Generating ssl keystore...

You can now start the broker by executing:

   "/root/apache-apollo-1.7.1/bin/mybroker/bin/apollo-broker" run

Or you can setup the broker as system service and run it in the background:

   sudo ln -s "/root/apache-apollo-1.7.1/bin/mybroker/bin/apollo-broker-service" /etc/init.d/
   /etc/init.d/apollo-broker-service start

root@localhost:~/apache-apollo-1.7.1/bin#
```

## 四、run broker

```
root@localhost:~/apache-apollo-1.7.1/bin# ./mybroker/bin/apollo-broker run

    _____                .__  .__
   /  _  \ ______   ____ |  | |  |   ____
  /  /_\  \\____ \ /  _ \|  | |  |  /  _ \
 /    |    \  |_> >  <_> )  |_|  |_(  <_> )
 \____|__  /   __/ \____/|____/____/\____/
         \/|__|  Apache Apollo (1.7.1)


Loading configuration file '/root/apache-apollo-1.7.1/bin/mybroker/etc/apollo.xml'.
INFO  | OS     : Linux 2.6.32-042stab123.3 (Ubuntu 16.04 LTS)
INFO  | JVM    : OpenJDK 64-Bit Server VM 1.8.0_131 (Oracle Corporation)
INFO  | Apollo : 1.7.1 (at: /root/apache-apollo-1.7.1)
INFO  | OS is restricting the open file limit to: 100000
INFO  | Accepting connections at: tcp://0.0.0.0:61613
INFO  | Accepting connections at: tls://0.0.0.0:61614
INFO  | Starting store: leveldb store at /root/apache-apollo-1.7.1/bin/mybroker/data
INFO  | Accepting connections at: ws://0.0.0.0:61623/
INFO  | Accepting connections at: wss://0.0.0.0:61624/
INFO  | Administration interface available at: https://127.0.0.1:61681/
INFO  | Administration interface available at: http://127.0.0.1:61680/
...
```

## 五、Administration interface for remote

If you want to disable the web the interface then you should remove the web_admin configuration elements. If you want to allow remote administration, you should update the configuration so it bind either the 0.0.0.0 or [::] address.

* cat mybroker/etc/apollo.xml
  ```
  ...
  <!--
  <web_admin bind="http://127.0.0.1:61680"/>
  <web_admin bind="https://127.0.0.1:61681"/>
  -->
  <web_admin bind="http://0.0.0.0:61680"/>
  <web_admin bind="https://0.0.0.0:61681"/>
  ...
  ```
* **login passwd**: etc/users.properties
  ```
  ...
  admin=123456
  zengjf = 123456
  ```
* **groups**: etc/groups.properties
  ```
  ...
  admins=admin|zengjf
  ```
* Web access from browser:  
  ![img/MQTT_Apollo_Admin_Remote_Interface.png](img/MQTT_Apollo_Admin_Remote_Interface.png)

## 六、Example Code

* 6.1 Test Code 
  ```Python
  #!/usr/bin/env python
  # -*- coding: utf-8 -*-
  
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
  
  HOST = "127.0.0.1"    #IP address of broker
  
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
  ```
* 6.2 测试输出信息
  ```Shell
  root@localhost:~/mqtt# python apollo.py
  [Errno 104] Connection reset by peer
  Interval 0: 0.000136852264404
  
  [Errno 104] Connection reset by peer
  Interval 1: 0.000112056732178
  
  [Errno 104] Connection reset by peer
  [Errno 104] Connection reset by peer
  Interval 2: 0.000102996826172
  
  Interval 3: 0.000102043151855
  
  [Errno 104] Connection reset by peer
  [Errno 104] Connection reset by peer
  Interval 4: 0.000112056732178
  ...  
  ```
* 6.3 log日志报错(log/connection.log)
  ```
  ...
  2017-11-06 02:47:01,655 MQTT connection '/23.106.155.16:38924' error: Internal Server Error: java.lang.NullPointerException
  2017-11-06 02:47:01,656 disconnected: local:/23.106.155.16:61613, remote:/23.106.155.16:38924
  2017-11-06 02:47:01,658 connected: local:/23.106.155.16:61613, remote:/23.106.155.16:38594
  2017-11-06 02:47:01,659 connected: local:/23.106.155.16:61613, remote:/23.106.155.16:38594
  2017-11-06 02:47:01,660 MQTT connection '/23.106.155.16:38594' error: Internal Server Error: java.lang.NullPointerException
  2017-11-06 02:47:01,660 disconnected: local:/23.106.155.16:61613, remote:/23.106.155.16:38594
  ```
* 6.4 [Apache Apollo on Ubuntu 14.04 - Can not connect to Websocket (Thread issue?)](https://stackoverflow.com/questions/35863107/apache-apollo-on-ubuntu-14-04-can-not-connect-to-websocket-thread-issue)
* 6.5 Windows上遇到同样的问题：`WARN  | Internal Server Error: java.lang.NullPointerException`
* 6.6 针对以上的问题，不再进行解决。

