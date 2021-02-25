> 优雅拖拽组件，大福音！
>
> 上手难度小，制作简单！（国外教程的搬运工ಥ_ಥ）

### 1、安装

```shell
yarn add react-beautiful-dnd
```

### 2、总体一览

#### - 瞄一眼官方图

> 一共就三个东西（都是标签！！），看不懂没关系大致了解一下，下面会有具体介绍

| 名称            | 中文名     | 作用/写法                               |
| --------------- | ---------- | --------------------------------------- |
| DragDropContext | 拖拽上下文 | 就是context写于最外侧包裹需要拖拽的组件 |
| Droppable       | 可放置组件 | 包裹可放置组件                          |
| Draggable       | 可拖拽组件 | 包裹可拖拽组件                          |

![image-20210225151506478](https://raw.githubusercontent.com/caifeng123/pictures/master/image-20210225151506478.png)

#### - 三兄弟如何书写

##### 	DragDropContext

- 写法

> 标签包裹需要的组件即可

```jsx
import React, {useState} from "react";
import {DragDropContext} from "react-beautiful-dnd";

const TodoList = () => {
  const dragEnd = (e) => {
    // 拖拽结束后
	  // do something 。。。。
  };
  return (
    <DragDropContext
      onDragEnd={(e)=>dragEnd(e)}
   // onDragUpdate = {(e)=>dragUpdate(e)}
   // onDragStart = {(e)=>dragStart(e)}
    >
      {
        //你的<Droppable/>组件
      }
    </DragDropContext>
  );
};

export default TodoList;
```

- api

> 上面代码有出现`onDragEnd` 不仅如此还有 `onDragStart`、 `onDragUpdate`
>
> 分别用作处理拖拽结束，开始，拖动中的回调

我们来看看这些函数的e

| 字段                       | 含义                   |
| -------------------------- | ---------------------- |
| draggableId                | 拖拽的组件的id         |
| +source                    | 拖拽源头               |
| - source.dropppableId      | 位于可扔的id号         |
| - source.index             | 拖拽index下标          |
| +destination               | 当前目标位置（目的地） |
| - destination.dropppableId | 位于可扔的id号         |
| - destination.index        | 位于可扔的index下标    |

```js
// `onDragStart`
const start = {
  draggableId: 'task1',
  type: 'TYPE',
  source: {
    dropppableId: 'column1',
    index: 0
  }
}

// `onDragUpdate`
const update = {
  ...start,
  destination: {
    dropppableId: 'column1',
    index: 1
  }
}

// `onDragEnd`
const end = {
  ...update,
  reason: 'DROP'
}
```



##### Droppable

> 上面那些是啥？？？ 什么放置id 拖拽id？我们现在来看看我们的可放置组件

- 每一个<Droppable/>组件都有一个droppableId参数，用来标注唯一的放置Id（上面提到的三个回调中出现的，确保唯一）

- 在组件内侧只接受函数，官方说可以更好让开发者自由发挥操作，但有些必要的参数必须书写

  ```jsx
  /*
  ** 写于<Droppable/>标签中的funtion的框架
  ** - provided参数：提供内部标签所需的props【套路记住即可】
  ** 		1、innerRef:获取ref funtion组件是ref，class组件是innerRef
  **    2、droppableProps: 提供能够放置的props，在function的根结点展开即可{...provided.droppableProps}
  **    3、placeholder: 占位符，放置在function根节点内部的最下面
  ** - snapshot参数：此为快照（让我好容易想到mobx里的快照不知道为什么，但不一样，详见下面解析）
  */		
  {
    (provided, snapshot) => (
      <div 
        ref={provided.innerRef}
        {...provided.droppableProps}
      >
        {
  				// 你的<Draggable/> 组件
        }
        {provided.placeholder}
      </div>
     )
  }
  ```

- 示例：

```jsx
import React from "react";
import {Droppable} from "react-beautiful-dnd";
import Task from "./task";

const Column = ({id, title, tasks}) => (
  <>
    <Droppable droppableId={id}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {tasks.map((task, index) => (
            <Task key={task.id} {...task} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </>
);

export default Column;
```



##### Draggable

> <Droppable/>放置组件套框架,拖拽呢？答案就是那当然了~

- 首先<Droppable/>有个droppableId确保唯一性，我们的<Draggable/>当然也有啦！此外还有一个index
  - draggableId确保拖拽唯一性，并在三个回调函数中调用
  - index拖拽下标：拖拽理论上总归是在列表中上下移动位置，拖拽位置不同，排列下标也不同，index就是为了排序的

- 在组件内侧只接受函数，和上面差不多

  ```jsx
  /*
  ** 写于<Draggable/>标签中的funtion的框架
  */		
  {
    (provided, snapshot) => (
    	<div
      	ref={provided.innerRef}
    		{...provided.dragHandleProps}
  			{...provided.draggableProps}
  		>
    		{
  				// 你想渲染的拖拽组件
  			}
    	</div>
  	)
  }
  ```

  - provided参数：提供内部标签所需的props【套路记住即可】

    - 1、innerRef:获取ref funtion组件是ref，class组件是innerRef

    - 2、draggableProps: 提供能够拖拽的props，在function的根结点展开即可`{...provided.draggableProps}`

    - 3、dragHandleProps: 绑定在真正想要拖拽的组件上（不理解？看个场景）

      <img src = "https://raw.githubusercontent.com/caifeng123/pictures/master/image-20210225164257501.png" height = 500/>

      此时我们需要做一个可拖拽排序的列表，但只能拖拽左上角的人头，其他的地方不起拖拽效果

      只需要在想要拖拽的组件上添加上`{...provided.dragHandleProps}`即可

      ```jsx
      {
        (provided, snapshot) => (
        	<div
          	ref={provided.innerRef}
        	// - {...provided.dragHandleProps}
      			{...provided.draggableProps}
      		>
        		{
      				<div>
            		<Avature 
                  {...provided.dragHandleProps}
                  />
                <OtherContent/>
            	</div>
      			}
        	</div>
      	)
      }
      ```

  - snapshot参数：此为快照,<Droppable/>里的函数也有，我们一起来看看这是干啥的

    - 先来看看参数里面有什么东西

      ```js
      // snapshot in <Draggable/>
      const draggableSnapShot = {
        isDragging: true,
        draggingOver: 'column1'		// 拖拽穿过的可放置组件id即 droppableId
      }
      
      // snapshot in <Droppable/>
      const droppableSnapShot = {
        isDraggingOver: true,
        draggingOverWith: 'task1'	// 正被拖拽穿过我的拖拽组件id即 draggableId
      }
      ```

    - > 是不是还是不太能理解？我们来分析一下：

      对于可拖拽的组件<Draggable/>来说，它被拖拽时关心的是经过了哪些被放置的组件

      对于可放置的组件<Droppable/>来说，它关心的是经过了哪些可拖拽组件被拖拽经过

- 示例：

```jsx
import React from "react";
import {Draggable} from "react-beautiful-dnd";

const Task = ({id, content, index}) => {
  return (
    <div style={{margin: 3}}>
      <Draggable draggableId={id} index={index}>
        {(provided, snapshot) => (
          <div
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            {// eslint-disable-next-line max-len
              <div style={{border: "2px solid #000", background: snapshot.isDragging?"#ccc":"lightgreen"}}>{content}</div>
            }</div>
        )}
      </Draggable>
    </div>
  );
};

export default Task;
```





