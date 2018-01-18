# MQTT Learning Docs

MQTT基于TCP，实现了异步Pub/Sub。

**简单HTML示例代码**  
[code/html/ShowTime](code/html/ShowTime)

## 一、参考文章：

* [MQTT教學（一）：認識MQTT](https://swf.com.tw/?p=1002)
* [MQTT】在Ubuntu下搭建MQTT服务器](http://blog.csdn.net/yannanxiu/article/details/70504586)
* [Apollo 1.7.1 User Manual](https://activemq.apache.org/apollo/documentation/user-manual.html)
* [python+mqtt实现推送](http://yunsonbai.github.io/2016/05/24/mqtt-python/)
* [This is an example of how use the MQTT protocol with ActiveMQ.](https://github.com/apache/activemq/tree/master/assembly/src/release/examples/mqtt/java)
* [【MQTT應用學習系列（一）】Apollo代理+paho](http://www.itread01.com/articles/1488211049.html)
* [MQTT比TCP协议好在哪儿？](https://www.zhihu.com/question/23373904)
* [Topic 通配符](https://www.ibm.com/support/knowledgecenter/zh/SSCGGQ_1.2.0/com.ibm.ism.doc/Overview/ov00032.html)
* [AWS IoT 开发物联网之MQTT——Hello,World](https://www.phodal.com/blog/aws-iot-development-iot-application-mqtt/)

## 二、Docs

* [docs/0011_baidu_IoT_Visualization.md](docs/0011_baidu_IoT_Visualization.md)
* [docs/0010_paho.mqtt.embedded-c_STM32.md](docs/0010_paho.mqtt.embedded-c_STM32.md)
* [docs/0009_paho.mqtt.embedded-c.md](docs/0009_paho.mqtt.embedded-c.md)
* [docs/0008_baidu_IoT_Hub_SIM800C.md](docs/0008_baidu_IoT_Hub_SIM800C.md)
* [docs/0007_baidu_IoT_Hub_HTML5_MQTT.md](docs/0007_baidu_IoT_Hub_HTML5_MQTT.md)
* [docs/0006_baidu_IoT_Hub_DB.md](docs/0006_baidu_IoT_Hub_DB.md)
* [docs/0005_baidu_IoT_Hub.md](docs/0005_baidu_IoT_Hub.md)
* [docs/0004_mosquitto_SSL_single_CA.md](docs/0004_mosquitto_SSL_single_CA.md)
* [docs/0003_mosquitto_guide.md](docs/0003_mosquitto_guide.md)
* [docs/0002_paho-mqtt_mosquitto.md](docs/0002_paho-mqtt_mosquitto.md)
* [docs/0001_paho-mqtt_Apache_Apllo.md](docs/0001_paho-mqtt_Apache_Apllo.md)

## 三、基本概念：

* 发布/订阅模式：
  * 发布者与订阅者不必了解彼此，只要认识同一个消息代理即可。
  * 发布者和订阅者不需要交互，发布者无需等待订阅者确认而导致锁定。
  * 发布者和订阅者不需要同时在线，可以自由选择时间来消费消息。
* MQTT是通过主题对消息进行分类的，本质上就是一个UTF-8的字符串，不过可以通过反斜杠表示多个层级关系：
  * building-b/floor-5：代表B楼5层的设备。
  * +/floor-5：代表任何一个楼的5层的设备。
  * building-b/#：代表B楼所有的设备。
* 为了满足不同的场景，MQTT支持三种不同级别的服务质量（Quality of Service，QoS）为不同场景提供消息可靠性：
  * 级别0：尽力而为。消息发送者会想尽办法发送消息，但是遇到意外并不会重试。
  * 级别1：至少一次。消息接收者如果没有知会或者知会本身丢失，消息发送者会再次发送以保证消息接收者至少会收到一次，当然可能造成重复消息。
  * 级别2：恰好一次。保证这种语义肯定会减少并发或者增加延时，不过丢失或者重复消息是不可接受的时候，级别2是最合适的。
* MQTT拥有14种不同的消息类型：
  * CONNECT：客户端连接到MQTT代理
  * CONNACK：连接确认
  * PUBLISH：新发布消息
  * PUBACK：新发布消息确认，是QoS 1给PUBLISH消息的回复
  * PUBREC：QoS 2消息流的第一部分，表示消息发布已记录
  * PUBREL：QoS 2消息流的第二部分，表示消息发布已释放
  * PUBCOMP：QoS 2消息流的第三部分，表示消息发布完成
  * SUBSCRIBE：客户端订阅某个主题
  * SUBACK：对于SUBSCRIBE消息的确认
  * UNSUBSCRIBE：客户端终止订阅的消息
  * UNSUBACK：对于UNSUBSCRIBE消息的确认
  * PINGREQ：心跳
  * PINGRESP：确认心跳
  * DISCONNECT：客户端终止连接前优雅地通知MQTT代理
* 市面上有相当多的高质量MQTT代理，其中mosquitto是一个开源的轻量级的C实现，完全兼容了MQTT 3.1和MQTT 3.1.1。

## 四、Code

* Python 2
  * [code/py2/client.py](code/py2/client.py)
  * [code/py2/server.py](code/py2/server.py)
* Python 3
  * [code/py3/client.py](code/py3/client.py)
  * [code/py3/server.py](code/py3/server.py)
* HTML
  * [code/html/index.html](code/html/index.html)
