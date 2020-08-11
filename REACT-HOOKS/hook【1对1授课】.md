## hook【1对1授课】

> 背景：在远古的class版本有一段黑暗时期，无数人被冗长的代码所困扰！但它特有的东西又是无法割舍的

### 0 、class与function比较：

|                        |   class    |    function     |
| :--------------------- | :--------: | :-------------: |
| 私有数据（this.state） |     ✔      |        ❌        |
| 生命周期函数           |     ✔      |        ❌        |
| 运行效率               |    略慢    |      略快       |
| props                  | this.props | 形参中传入props |



<h2 style="text-align:center;color:#096dd9">黑暗时间已经过去，宇宙特工福音来了</h2>

### 1、usestate

> Function组件就不配有state？------------useState来帮你！

```js
//返回一个 state，以及更新 state 的函数。
const [state, setState] = useState(initialState);
//setState 函数用于更新 state。它接收一个新的 state 值并将组件的一次重新渲染加入队列。
setState(newState);
```

- 与原先state不同的是 需要细化useState 有利于之后的 useEffect！
- 但可能会造成数量过多的情况，则需要自定义hook

### 2、useEffect

> Function组件就不配有生命周期？componentDidMount？componentDidUpdate？componentWillUnmount？ ------------useEffect来帮你！

<b><span style="color:#f5222d">tip：</span><span>虽然 useEffect 会在浏览器绘制后延迟执行【即略微慢于class的生命周期】，但会保证在任何新的渲染前执行。</span></b>

```js
//初始化操作 等价于 componentDidMount 只会执行一次！
useEffect(() => {
	init()
},[]);

//等价于 componentDidUpdate 当num变化时 会对应执行的操作
useEffect(() => {
	console.log(num)
},[num]);

//等价于 componentWillUnmount 只会执行一次！
useEffect(() => {
  const subscription = props.source.subscribe();
  return () => {
    subscription.unsubscribe();
  };
});
```



### 3、useContext

> Q: 你是否有这种需求 一个组件的数据 被他的 孙子的孙子需要？
>
> A: redux啊，不会吧不会还有人不会吧！	【 Ps：不会的去看我的redux专题】
>
> Q:但正常来说当你的代码量或项目体量小于8w行时是不需要redux的，只会浪费资源
>
> A: 那props传吧。。。
>
> Q: 累不累呢，每一层都需要接prop+传prop，会不会传错先不说，写的恶心不？

<h3 style="color:#5b8c00;text-align:center">duang～～～～ "useContext" 横空出世</h3>

```jsx
//父组件用createContext创建上下文
//并暴露！ 目的让其子接收并使用
export const Moneycontext = createContext()
function Usecontext() {
  return (
    <Moneycontext.Provider value={{setMoney,money}}>
      <Main/>
    </Moneycontext.Provider>
  );
}

//子组件 获取到祖先组件的上下文 从中即可获取数据！
const {money,setMoney} = useContext(Moneycontext)
```



### 4、useReducer

- 先看一下示例代码

```jsx
const initialState = {count: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
```



> \- 憨憨: 哈哈，这我熟啊！redux呀，看来这就是redux的hook版了吧！【 Ps：不会的去看我的redux专题】
>
> \- 无敌炫酷帅气的博主: 完全错了，这是useState的升级版！千万别和redux搞混了！【redux的hook版在redux中专题有解说！】
>
> \- 憨憨: 这样子不是一摸一样，说！到底啥不同
>
> \- 无敌炫酷帅气的博主: redux作用是数据全局管理，不必通过其他组件传递 `props` 来实现。但如果这里要实现redux效果，必须将dispatch利用props向下传递！ 那又回到上面的useContext的问题了。所以你可以用useReducer+useContext去实现一个类似的redux，但还是无法替代。
>
> \- 憨憨: 字太多了，看不进去。。。那这和useState又有什么区别，不都是操作数据 干嘛要写这么多！
>
> \- 无敌炫酷帅气的博主: 看来上面useState也没好好看啊，useState是越细越好，useReducer的数据就是海纳百川叻。



此外 还有其他不少好处：

- 不用的话，会生成过多的useState 而且这管理找起来也太麻烦了！找个东西找一年，看的也烦

```js
//做个登陆 要这么多 要了老命了！【当然你可以用自定义hook😊】
const [name, setName] = useState(''); 
const [pwd, setPwd] = useState(''); 
const [isLoading, setIsLoading] = useState(false); 
const [error, setError] = useState(''); 
const [isLoggedIn, setIsLoggedIn] = useState(false); 
```

- 可读性会大大提高 【一个dispatch做一个事情，处理对应数据】

```jsx
    const initState = {
        name: '',
        pwd: '',
        isLoading: false,
        error: '',
        isLoggedIn: false,
    }
    function loginReducer(state, action) {
        switch(action.type) {
            case 'login':
                return {
                    ...state,
                    isLoading: true,
                    error: '',
                }
            case 'success':
                return {
                    ...state,
                    isLoggedIn: true,
                    isLoading: false,
                }
            case 'error':
                return {
                    ...state,
                    error: action.payload.error,
                    name: '',
                    pwd: '',
                    isLoading: false,
                }
            default: 
                return state;
        }
    }
```

<h3>总结一下何时用！</h3>

- 如果你的`state`是一个数组或者对象
- 如果你的`state`变化很复杂，经常一个操作需要修改很多state
- 如果你希望构建自动化测试用例来保证程序的稳定性



### 5、useMemo & useCallback

> diff算法常常被听到，当你数据修改后会重新渲染，这是特性。然而有些写死不动的，为什么还要多次重新渲染/计算呢？?

这俩货 就是用来处理这个的！

- 来看看他们的异同：

| 同                         | 异                                                         |
| -------------------------- | ---------------------------------------------------------- |
| 接收的参数                 | `useMemo`返回的是函数运行的结果，`useCallback`返回的是函数 |
| 在其依赖项发生变化后才执行 |                                                            |
| 都是返回缓存的值           |                                                            |
| 避免重复渲染，造成资源消耗 |                                                            |

- 看一下示例代码
  - sum函数每次调用计算会打印 `-`
  - 若直接使用函数 则每次都会去调用重复的计算函数
  - 此时用useMemo【因为返回的是结果值】只会调用一次！

```jsx
import React,{useState,useMemo} from 'react'

const Usememo = () => {
  const [string,setString] = useState('')
  // const sum = () =>{
  //   console.log('-')
  //   let sum = 0
  //   for(let i = 0;i<100;i++){
  //     sum+=i
  //   }
  //   return sum
  // }
  const sum = useMemo(() =>{
    console.log('-')
    let sum = 0
    for(let i = 0;i<100;i++){
      sum+=i
    }
    return sum
  },[])

  return (
    <div>
      <button onClick={()=>setString(string=>string+sum) }>biu</button>
    </div>
  )
}

export default Usememo
```



### 6、useRef

> ref是我们最常用来操纵节点的，hook也提供了useRef去操纵节点。但它！不仅仅止于此。。。。

`useRef` 返回一个可变的 ref 对象，其 `.current` 属性被初始化为传入的参数（`initialValue`）。返回的 ref 对象在组件的整个生命周期内保持不变。

- *自然而然的 我们会去操作dom节点*

```jsx
import React,{useState} from 'react'

const UseRef = () => {
  const myref = useRef()
  const change = () =>{
    // console.log(myref)
    //操作dom节点
    myref.current.innerText=22
  }
  return (
    <>
      <div ref={myref}>111</div>
      <button onClick={()=>change()}>change</button>
      <br/>
    </>
  )
}
```



- 然而，`useRef()` 比 `ref` 属性更有用。它可以很方便地保存任何可变值，其类似于在 class 中使用实例字段的方式。
  - 可以用来计数，记录变量等
  - 定时器的清除

```jsx
function Timer() {
  const intervalRef = useRef();

  useEffect(() => {
    const id = setInterval(() => {
      // ...
    });
    intervalRef.current = id;
    return () => {
      clearInterval(intervalRef.current);
    };
  });

  // ...
}
```



### 7、useImperativeHandle

> 有时我们会需要让子组件的方法 给父组件调用。那该如何是好呀，记不记得ref 他不是能存吗 把它丢出去不就行啦。

```jsx
function FancyInput(props, ref) {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));
  return <input ref={inputRef} ... />;
}
FancyInput = forwardRef(FancyInput);
```

