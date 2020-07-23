# flex布局总结

*一直在用  `flex`  但一直没总结，在此留做笔记*



## 一、父项常用参数【前提设置display:flex】

> 注意，设为Flex布局以后，子元素的float、clear和vertical-align属性将失效。

下面介绍一下6大属性

### 1、flex-direction属性

![image-20200612214657485](C:\Users\59474\AppData\Roaming\Typora\typora-user-images\image-20200612214657485.png)

> （1）row（默认值）：主轴为水平方向，起点在左端。 

- 排序【1 2 3 4】

> （2）row-reverse：主轴为水平方向，起点在右端。

- 排序【4 3 2 1】

> （3）column：主轴为垂直方向，起点在上沿。

同理 竖过来的  1，2，3，4

> （4）column-reverse：主轴为垂直方向，起点在下沿。

### 2、flex-wrap属性

> （1）nowrap（默认）：不换行。

- 当内宽度总和>外宽度时 内部元素的宽度会被挤压变小

![img](https://upload-images.jianshu.io/upload_images/13944531-ce8c6f815b5bfc0a.png?imageMogr2/auto-orient/strip|imageView2/2/w/700/format/webp)

> （2）wrap：换行，第一行在上方。

![img](https://upload-images.jianshu.io/upload_images/13944531-0701b857c3588b37.jpg?imageMogr2/auto-orient/strip|imageView2/2/w/700/format/webp)

> （3）wrap-reverse：换行，第一行在下方。

![img](https://upload-images.jianshu.io/upload_images/13944531-0ae21f2bd8af65f8.jpg?imageMogr2/auto-orient/strip|imageView2/2/w/700/format/webp)

### 3、flex-flow 属性

> 【flex-flow】 = 【flex-direction】+【flex-wrap】

将1与2结合的简便写法 例如：

```css
flex-flow: row nowrap;
				||
flex-direction:row;
flex-wrap:nowrap;
```



### 4、 justify-content 属性

*显而易见 就是内容的位置*

> （1）flex-start（默认值）：左对齐

- 居左

> （2）flex-end：右对齐

- 居右

> （3）center： 居中

- 居中

> （4）space-between：

- 两端贴边，之间的间隔都相等。n-1个间隙 【看5的图】

> （5）space-evenly: 

![img](https://img-blog.csdnimg.cn/20200510154218608.png)

> （6）space-around：每个项目两侧的间隔相等。【类似5】





### 5、align-items 与align-content属性 

> （1）stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。

> （2）flex-start：交叉轴的起点对齐。

> （3）flex-end：交叉轴的终点对齐。

> （4）center：交叉轴的中点对齐。

> （5）baseline: 项目的第一行文字的基线对齐。

**align-content属性值：**

>space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。

> space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。



## 二、子项常用参数【前提父项设置display:flex】

### 1、flex-grow

*默认值为0*

> 所有项会照 flex-grow 值进行，按其比例等分

- 当设置前三项 flex-grow 为 1 最后一个为3时 

- 会自动计算 总和6 分别为 1/6 1/6 1/6 3/6 

  ![image-20200613115028954](C:\Users\59474\AppData\Roaming\Typora\typora-user-images\image-20200613115028954.png)

### 2、flex-shrink属性

*默认值为1*

> 当在一行时 每一项都会被压缩

![image-20200613112905303](C:\Users\59474\AppData\Roaming\Typora\typora-user-images\image-20200613112905303.png)

> 但若一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，该项不缩小。

![image-20200613112832916](C:\Users\59474\AppData\Roaming\Typora\typora-user-images\image-20200613112832916.png)

### 3、flex属性

*默认值为 0 1 auto*

> flex属性是flex-grow, flex-shrink 和 flex-basis的简写