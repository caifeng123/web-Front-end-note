# redux的基础

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



### 中间件

> 在action 与 reducer中插入中间件 即会在执行操作前进行“副作用”如异步请求 打印日志【即加入自己想要的操作】

1、样例代码

- store 的创建

```js
//store.js
import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'

export default createStore(reducers,applyMiddleware(thunk))
```

- 异步的action

```js
export const login = (user) => {
  return async dispatch => {
    //发送ajax请求/异步操作
    const res = await reqLogin(user)
    dispatch({type: 'success',payload: res})
  }
}
```



2、使用原因

> - Redux 的核心理念是严格的单向数据流，只能通过 `dispatch(action)` 的方式修改 store。而在实际业务中往往有大量异步场景。
> - 又由于在reducer中不能去调用异步请求修改state
> - 然而一般的 `dispatch`只能接收对象{} ，无法接收方法。

上面三点原因导致 我们需要使用中间键改写的 dispatch 方法，从而调用异步请求？？下面来看看redux-thunk 的源码，为什么这个可以实现。

```js
function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState, extraArgument);
    }
    return next(action);
  };
}
```

- 会去判断传入的是否是方法【方法代表了异步（看样例代码）】
  - true：会调用该action 若方法是
  - false：即代表是{type:xxx}形式，直接被dispatch 即可

- 再看一下applyMiddleware的源码

  - ```js
    export default function applyMiddleware(...middlewares) {
      return (createStore) => (reducer, preloadedState, enhancer) => {
        // 接收 createStore 参数
        var store = createStore(reducer, preloadedState, enhancer)
        var dispatch = store.dispatch
        var chain = []
    
        // 传递给中间件的参数
        var middlewareAPI = {
          getState: store.getState,
          dispatch: (action) => dispatch(action)
        }
    
        // 注册中间件调用链，并由此可知，所有的中间件最外层函数接收的参数都是{getState,dispatch}
        chain = middlewares.map(middleware => middleware(middlewareAPI))
    
        //=================最关键封装生成dispatch的代码===================
        //此处用到的compose会返回增强的dispatch(在下面有补充)
        dispatch = compose(...chain)(store.dispatch)
        //=============================================================
    
        // 返回经 middlewares 增强后的 createStore
        return {
          ...store,
          dispatch
        }
      }
    }
    ```

  - 补充上面提到的 compose

    > 1、compose 函数起到代码组合的作用：compose(f, g, h)(...args) 效果等同于 f(g(h(...args)))
    >
    > 2、所有的中间件最二层函数接收的参数为 dispatch/next【next即被增强后的dispatch】

  ```js
  function compose(...funcs) {
    if (funcs.length === 0) {
      return arg => arg
    }
  
    if (funcs.length === 1) {
      return funcs[0]
    }
  
    return funcs.reduce((a, b) => (...args) => a(b(...args)))
  }
  ```

  

3、书写自己的中间件

> 由阅读redux-thunk过程可发现，就是进行了一次判断是否是函数 还是 {} 对其操作执行还是dispatch而已
>
> 那我们自己也可以仿照学习写一个

```js
const logger = ({ dispatch, getState }) => next => action => {
  console.log('【logger】即将执行:', action)

    // 调用 middleware 链中下一个 middleware 的 dispatch。
  let returnValue = next(action)

  console.log('【logger】执行完成后 state:', getState())
  return returnValue
}
```

- `next(action)`作为分界线---》调用action的时机，调用即为调用 middleware 链中下一个 middleware 的 dispatch。
- 向上为调用前执行副作用，向下为调用后副作用，最后返回上一层