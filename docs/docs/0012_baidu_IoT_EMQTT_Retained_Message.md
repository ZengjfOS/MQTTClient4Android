# baidu IoT EMQTT Retained Message

## 参考文档

* [MQTT保留消息(Retained Message)](http://docs.emqtt.cn/zh_CN/latest/mqtt.html#mqtt-retained-message)

## 清楚保留消息

保留消息(Retained Message)有两种清除方式:

* 客户端向有保留消息的主题发布一个空消息: `mosquitto_pub -r -q 1 -t a/b/c -m ''`
* 消息服务器设置保留消息的超期时间。

