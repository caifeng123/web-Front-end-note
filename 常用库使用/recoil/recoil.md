> facebook 的全局状态管理，相对于常用的全局状态管理redux/mobx有可用的地方
>
> 虽说都是hook，但上手+学习成本有点高
>
> 用作实践笔记和总结，踩了坑给大家一起分享

### 0、安装

Npm 即可

### 1、最外侧RecoilRoot

```js
import {RecoilRoot} from 'recoil';

function AppRoot() {
  return (
    <RecoilRoot>
      <ComponentThatUsesRecoil />
    </RecoilRoot>
  );
}
```

### 2、常见钩子

- useRecoilState

> 用于读写

- useRecoilValue

> 用于读 [atom|selector]

- useSetRecoilState

> 仅用作设置

- useRecoilCallback

> 只读不订阅 数据变化也不会导致当前组件重渲染。

```js
import {atom, useRecoilCallback} from 'recoil';

const itemsInCart = atom({
  key: 'itemsInCart',
  default: 0,
});

function CartInfoDebug() {
  const logCartItems = useRecoilCallback(({snapshot}) => async () => {
    const numItemsInCart = await snapshot.getPromise(itemsInCart);
    console.log('Items in cart: ', numItemsInCart);
  });

  return (
    <div>
      <button onClick={logCartItems}>Log Cart Items</button>
    </div>
  );
}
```

- selector

> 主要注意的是，selector 可能会被重复执行多次，所以其结果会被缓存，它应该是一个纯函数，相同的输入参数和依赖项，其得到的值应该是一样的。
>
> 同样，在使用异步状态时，也需要相同的输入，得到的值是相同的。相同的查询参数，只会执行一次异步查询。

```js
import {atom, selector, useRecoilState, DefaultValue} from 'recoil';

const tempFahrenheit = atom({
  key: 'tempFahrenheit',
  default: 32,
});

// 同步
const tempCelsius = selector({
  key: 'tempCelsius',
  get: ({get}) => ((get(tempFahrenheit) - 32) * 5) / 9,
  set: ({set}, newValue) =>
    set(
      tempFahrenheit,
      newValue instanceof DefaultValue ? newValue : (newValue * 9) / 5 + 32
    ),
});

// 异步
const a = selector({
  key: 'a',
  get: async({get})=>{
		  const aws = await axios.get(...);
      return aws + get(tempFahrenheit)
  }
})

function TempCelsius() {
  const [tempF, setTempF] = useRecoilState(tempFahrenheit);
  const [tempC, setTempC] = useRecoilState(tempCelsius);
  const resetTemp = useResetRecoilState(tempCelsius);

  const addTenCelsius = () => setTempC(tempC + 10);
  const addTenFahrenheit = () => setTempF(tempF + 10);
  const reset = () => resetTemp();

  return (
    <div>
      Temp (Celsius): {tempC}
      <br />
      Temp (Fahrenheit): {tempF}
      <br />
      <button onClick={addTenCelsius}>Add 10 Celsius</button>
      <br />
      <button onClick={addTenFahrenheit}>Add 10 Fahrenheit</button>
      <br />
      <button onClick={reset}>>Reset</button>
    </div>
  );
}
```

### 3、总结一下

#### - 与redux差别

- 经常在开发时redux对象很深，一但调用一个修改的action 就会重新生成新的state，导致不少其他也在state的里的模块会被重新渲染

```js
function reducerTest(state = initialState, action) {
  switch (action.type) {
    case 'ADD':
      const {info} = state
      const newInfo = {
      	...info,
        age: info.age+1
      }
      return { ...state,info:newInfo }
    default:
      return state
}}
```

- recoil会将粒度化的很细，当一个被改时 并不会造成其他变动，因为每个都是atom

```js
export const projectInfo = atom({key:'1',default:{}})

export const projectChangeLog = atom({key:'1',default:[]})

export const projectName = atom({key:'1',default:''})
```



#### - atom是异步！！！

#### - atom&atomfamily

> 开始不是很能理解这俩，看上去atomfamily是atom的集合？那为什么不用对象/map映射呢？

```js
// 对象映射
export const mock = {
	"1":atom({key:'1',default:''}),
  "2":atom({key:'2',default:''}),
}
// atomfamily
export const family = atomfamily({
  key:'family',
  default: (xx)=>xx+'haha'	// 返回字符串会自动包装为一个atom对象
})
```

> 通过实际研究下来 找到了不同的应用场景

-  通过对象映射:能做缓存+同步调用+增删数据（修改对象即可）

```js
/*
** 增+查
** 利用对象缓存所有atom，也可用map
*/
export const getAtomById = (id) => {
	if(!mock[id]){
  	mock[id] = atom({
      key: 'id',
      default: ''
    })
  }
  return mock[id]
}
/* 
** 改
** 通过useSetRecoilState(atom)获取到修改函数
** 调用函数即可类似useState的hook
*/
useSetRecoilState(getAtomById(id))(oldValue=>oldValue+'xxx')
```

- atomfamily:规范化+在组件/自定义hook中通过api调用

```js
import {family} from './store/xxx.js'
// family是上个代码段定义的atomfamily 传入id获取对应atom
const myAtom = family(id)
// 在进行其他操作
const [nowAtom,setNowAtom] = useRecoilState(myAtom)
```



#### 