 

### redux核心api

> Redux主要由三部分组成：store，reducer，action。



### redux流程示意图

![redux](/Users/caifeng01/Desktop/codes/笔记/web-Front-end-note/redux/imgs/redux.jpg)



### React-Redux

> 连接react与redux(数据处理中心)，有两个主要的api【connect和Provider】

- Provider实现store的全局访问，将store传给每个组件。

  > 原理：使用React的context，context可以实现跨组件之间的传递。

- connect连接React组件和Redux store。connect实际上是一个高阶函数，返回一个新的已与 Redux store 连接的组件类。

  ```js
  const VisibleTodoList = connect(
    mapStateToProps,
    mapDispatchToProps
  )(TodoList)
  ```

  - `mapStateToProps`：从Redux状态树中提取需要的部分作为props传递给当前的组件。
  - `mapDispatchToProps`：将需要绑定的响应事件（action）作为props传递到组件上。

**实际上 只需要在子组建中获取 对应参数与数据即可！！**

