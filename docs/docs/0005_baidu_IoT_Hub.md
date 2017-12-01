# Baidu IoT Hub

由于需要将设备获取的信息通过MQTT协议发送的服务器，看一下百度天工的工作方式。

## IoT Hub配置

* 注册账号、认证账号，选择区域，这里显示的北京：
  ![../img/Biadu_IoT_Hub_Select_Range.png](../img/Biadu_IoT_Hub_Select_Range.png)
* 选择创建的IoT Hub的模式，这里1百万条是免费的：
  ![../img/Biadu_IoT_Hub_Select_Range_fee.png](../img/Biadu_IoT_Hub_Select_Range_fee.png)
* 创建IoT Hub之后的主界面，由于本人是在深圳，所以选择了广州的服务器：
  ![../img/Biadu_IoT_Hub_Select_Manager_Board.png](../img/Biadu_IoT_Hub_Select_Manager_Board.png)
* 创建IoT实例，点击前面的实例名称可以进入配置实例：
  ![../img/Biadu_IoT_Hub_Select_Manager_Board_Instance.png](../img/Biadu_IoT_Hub_Select_Manager_Board_Instance.png)
* [配置实例](https://cloud.baidu.com/doc/IOT/Quickstart.html#.E5.88.9B.E5.BB.BA.E5.AE.9E.E4.BE.8B)界面：：
  ![../img/Biadu_IoT_Hub_Instance_Manager_Board.png](../img/Biadu_IoT_Hub_Instance_Manager_Board.png)
* [创建设备](https://cloud.baidu.com/doc/IOT/Quickstart/24.5C.E9.85.8D.E7.BD.AE.E5.AE.9E.E4.BE.8B.html)：：
  ![../img/Biadu_IoT_Hub_Instance_New_Device.png](../img/Biadu_IoT_Hub_Instance_New_Device.png)
  `QE0BHFvFnIkBRIaJtPYzo3m/63Esv5fzzMr9tYVOsHo=`
* 设备用户名：
  ![../img/Biadu_IoT_Hub_Instance_New_Device_Username.png](../img/Biadu_IoT_Hub_Instance_New_Device_Username.png)
* 添加Topic
  ![../img/Biadu_IoT_Hub_Instance_New_Device_Add_Topic.png](../img/Biadu_IoT_Hub_Instance_New_Device_Add_Topic.png)
* 设备测试：
  ![../img/Biadu_IoT_Hub_Instance_New_Device_Test.png](../img/Biadu_IoT_Hub_Instance_New_Device_Test.png)

## MQTT.fx测试

* [配置MQTT客户端](https://cloud.baidu.com/doc/IOT/Quickstart.html#.E9.85.8D.E7.BD.AEMQTT.E5.AE.A2.E6.88.B7.E7.AB.AF)：
  ![../img/Biadu_IoT_Hub_Instance_New_Device_MQTTfx_Config.png](../img/Biadu_IoT_Hub_Instance_New_Device_MQTTfx_Config.png)
* MQTT客户端Subscribe：
  ![../img/Biadu_IoT_Hub_Instance_New_Device_MQTTfx_Subscribe.png](../img/Biadu_IoT_Hub_Instance_New_Device_MQTTfx_Subscribe.png)
  
## VPS测试

* [../code/IoT_Hub/publish.py](../code/IoT_Hub/publish.py)
* [../code/IoT_Hub/subscribe.py](../code/IoT_Hub/subscribe.py)
