# 主要实战技巧

### 1、自动撑满剩下

> - 设置flex布局
> - 一项定死宽度/高度
> - 剩下的利用 `flex：auto` 撑满

```css
.父{
	display:flex;
  width:2000px
}
.子1{
	flex:auto
}
.子2{
	width:200px
}
```



### 2、垂直居中

#### (1)古董方法 

> - 外围一半 - 自身一半 = 居中

```css
.子1{
  margin-top: 50%;      
  margin-left: 50%;
  transform: translate(-50%,-50%);
}
或
.子2{
  position:absolute;
  top: 50%;      
  left: 50%;
  transform: translate(-50%,-50%);
}
```

#### (2)简单方法vertical-align

> - `vertical-align: middle`  行内元素居中
> - 父亲有 line-height
> - 孩子是 inline/inline-block 

```css
.父{
	line-height:50px
}
.子{
  display:inline/inline-block;
 	vertical-align: middle
}
```

#### (3)flex布局 （推荐）

> flex布局 最火热的布局
>
> - 父亲列排序+空间环绕
> - 孩子用margin 保证水平居中

```css
.父{
  display: flex;
  flex-direction: column;
  justify-content: space-around; 		/*垂直居中*/
}
.子{
	margin:0 auto		/*水平居中*/
}
```



