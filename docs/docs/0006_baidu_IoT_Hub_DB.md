# Baidu IoT Hub

* [产品配置操作问题](https://cloud.baidu.com/doc/IOT/FAQ.html#.99.E9.29.DF.F5.F8.42.48.E8.BE.23.DC.DA.AA.77.74)
* [时序数据库](https://cloud.baidu.com/product/tsdb.html)
* [规则引擎](https://cloud.baidu.com/product/re.html)
* [创建规则](https://cloud.baidu.com/doc/RE/GUIGettingStarted.html#.E5.88.9B.E5.BB.BA.E8.A7.84.E5.88.99)
* [将消息转发至TSDB](https://cloud.baidu.com/doc/RE/GUIGettingStarted.html#.E5.B0.86.E6.B6.88.E6.81.AF.E8.BD.AC.E5.8F.91.E8.87.B3TSDB)
* [数据点查询](https://cloud.baidu.com/doc/TSDB/FAQ.html#.8D.F6.6D.4C.08.1F.0B.71.C4.09.87.F7.ED.BA.FD.39)

## 将消息转发至TSDB

TSDB数据库要求数据必须包含**metric**、**value**和**timestamp**三个字段，以及额外一个或多个数据作为tag。如果原始消息中不包含这些字段，在将数据转发至TSDB前，需要对数据格式进行调整，如下所示：

## Rule Engine

设置Rule Engine，将IoT Hub中传输的数据转发存储到TSDB中。

![../img/Biadu_IoT_Hub_Rule_Engine_Set.png](../img/Biadu_IoT_Hub_Rule_Engine_Set.png)

## TSDB查询数据

![../img/Biadu_IoT_Hub_TSDB.png](../img/Biadu_IoT_Hub_TSDB.png)

## Publish Code

[../code/TSDB/publish.py](../code/TSDB/publish.py)

**数据格式**

```
{
    "metric":"report",
    "_timestamp": 175898797,
    "_value": 32,
    "id": "70:00:83:24:38:85", 
    "machine": "arm",
    "os": "linux",
    "categories": "data", 
    "type": "temperature"
}
```
