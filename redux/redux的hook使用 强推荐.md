# redux的hook使用

> hook版本的使用，能极简化代码操作，条理清晰。
>
> 在上一节中讲到老版的redux如何使用。实话实说挺麻烦的，我们再来复习一下

### 1、老版使用redux

- 在需要使用redux的最大组件进行 引入与包装

  ```jsx
  import {Provider} from 'react-redux'
  import store from './store' 			//此为store
  
  import App from './app';					//此为组件
  
  render(
    <Provider store={store}>
      <App/>
    </Provider>,
    document.getElementById('root')
  );
  ```

- 在自组建入口配置中间件/mapStateToProps/mapDispatchToProps 

  ```js
  import {connect} from 'react-redux'
  import App from './App.js'
  
  const mapStateToProps = (state, ownProps) => {
    return {
      ...ownProps,
      ...state
    }
  }
  
  const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      increase: who=>dispatch({type:"increase",who}),
      decrease: who=>dispatch({type:"decrease",who})
    }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(App)
  ```

- store的创建文件

  ```js
  //不需要异步请求【不要中间件】
  //store.js
  import {createStore} from 'redux'
  import reducer from './reducer'
  
  export default createStore(reducer)
  
  =============================================
  //需要异步请求【要中间件】
  //store.js
  import {createStore,applyMiddleware} from 'redux'
  import thunk from 'redux-thunk'
  import reducers from './reducers'
  
  export default createStore(reducers,applyMiddleware(thunk))
  ```

- reducer的文件创建

  ```js
  const init = {
    num:1,
    who:'0',
    ui:true
  }
  export default function(state = init,action){
    switch(action.type){
      case 'increase':
        const {num,who} = state
        return {...state,num:num + 1,who:who+1}
      case 'decrease':
        return {...state,num:state.num - 1}
      case 'toggle' :
        return {...state,ui:!state.ui}
      default:
        return state
    }
  }
  ```

- 子组件中调用action 【已放入mapDispatchToProps中，直接调用props中的方法即可】

  ```jsx
  import React from 'react';
  
  const App = (props) => {
    return (
      <>
        {props.num}
        <button onClick={()=>props.increase('1')}>2222</button>
        {props.who}
      </>
    );
  }
  
  export default App;
  ```

  

### 2、来看看hook版本

- 子组件中调用action 

  - useSelector替代mapStateToProps
  - useDispatch替代mapDispatchToProps

  > ***因为能useDispatch获得dispatch方法，那就能够实现异步!!!!!!!!!!!***  实际上可以封装一个专门做异步的方法避免多次重复import 

  

  - 应当将方法 写成action 封装到actions中，此处为展示方便

  ```jsx
  import React from "react";
  import { useSelector, useDispatch } from "react-redux";
  
  const Toggle = () => {
    const go = useSelector(state => state.go);
    const dispatch = useDispatch();
    const asyncfunc = () =>{
      setTimeout(()=>{
        dispatch({ type: 'toggle' })
      },1000)
    }
    return (
      <div>
        <div>{JSON.stringify(go)}</div>
        <input
          type="checkbox"
          value={go}
          onChange={() => asyncfunc()}
        />
      </div>
    );
  };
  
  export default Toggle;
  ```

- store的创建文件 【无需在使用中间件，因为异步调用已解决 只需创建store即可】

  ```js
  //store.js
  import {createStore} from 'redux'
  import reducer from './reducer'
  
  export default createStore(reducer)
  ```

- 在需要使用redux的最大组件进行 引入与包装 【不变】

  ```jsx
  import {Provider} from 'react-redux'
  import store from './store' 			//此为store
  
  import Toggle from './toggle';		//此为组件
  
  render(
    <Provider store={store}>
      <Toggle/>
    </Provider>,
    document.getElementById('root')
  );
  ```

  

### 3、总结

- 去掉  -  子组件入口 【即书写中间件层】
- 增加 + 子组件的引入{ useSelector, useDispatch }
- 减少  -  ./store.js创建时嵌套中间件