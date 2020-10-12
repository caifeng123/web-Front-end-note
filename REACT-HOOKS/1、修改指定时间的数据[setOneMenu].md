### 0、数据结构

```js
//food
{
  week:'2020-1',
  detail:[
  	{
     '19:00':{
        protein:[],   //蛋白质
        vitamin:[],   //维生素
        carbonWater:[] //碳水
      },
      '20:00':{
      	protein:[],   //蛋白质
        vitamin:[],   //维生素
        carbonWater:[] //碳水
      }
		},
    //共有7个 代表7天
  ]
}
//checkin
//年 ：周【1-48】：周几【1-7】
{
	"2020":{
  	"1":[1,2,3],  	
  	"2":[1,2,3,7],
    "20":[1,2,3]
  }
}
```



### 1、修改指定时间的数据[setOneMenu]

修改指定天的数据

​	当周：

  - 存在

    time字段

      - 存在-修改
      - 不存在-追加

- 不存在

  生成全周数据 （全是空）

Params:

- week
- index
- time
- detail

Response:

- Code:1 / 0
- Data:true/false

```js
     //input
		 {
        week:'2020-10',
        index:1,
        time:'',  //时间
        detail:{
          protein:[],   //蛋白质
          vitamin:[],   //维生素
          carbonWater:[] //碳水
        }
      }

    //response

    {
      errMsg: "cloud.callFunction:ok",
      result: {code: 0, data: true},
      requestID: "8efde1bd-f961-11ea-8244-5254000ead67"
    }
```



### 2、获取当前周数据

Params:

- week

Response:

- Code:1 / 0
- Data:{一周数据}

```js
     //input
		 {
        week:'2020-10',
     }

    //response
    {
      errMsg: "cloud.callFunction:ok",
      result:{
        code: 0,
        data: {_id: "d81cd5415f6445ee000b559b10ddd030", week: "2020-10", detail: Array(7)}
      },
      requestID: "678ddd81-f974-11ea-bccc-5254006d699d"
    }
```



### 3、签到

Params:

- year
- month
- Weekday

Response:

- Code:1 / 0
- Data:true/false

```js
     //input
		 {
        year:2020,
        month:1,
        weekday:4
     }

    //response
    {
        errMsg: "cloud.callFunction:ok"
        result: {code: 0, data: false}
        requestID: "768e80e1-f97e-11ea-adfc-525400b8ee5a"
    }
```