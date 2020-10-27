## 一、三类xss
### （1）反射型 XSS（Reflected XSS）
- 搜索
>后端返回“搜索不成功”数据</br>
>前端操作显示 “搜索{xxx}不成功”</br>
>此时【 xxx 】即可被人为操作

- 正常来说：
    - `xxx = 哈哈`</br>
	- 就会显示：`<span>搜索{哈哈}不成功</span>`

- 也可被人为写成 
	- `xxx = <script>alert(1)</script>`
 	- 就会显示：`<span>搜索 <script>alert(1)</script>不成功</span> `
 >对于script标签会被解析执行 导致xss

### （2）DOM 型 XSS（DOM-based XSS）
- url输入
> 前端数据从url中解析出来 显示/执行js代码</br>
> 此时【url】中被解析部分被人为操作

- 正常来说是：
	- `www.heihei.com/xxx = 哈哈`
	- 就会显示：`<span>单号：哈哈</span>`

 - 也可被人为写成 
 	- `www.heihei.com/xxx = <script>alert(1)</script>`
 	- 就会显示：`<span>单号：<script>alert(1)</script></span> `
 > 对于script标签会被解析执行 导致xss


### （3）存储型 XSS（Stored XSS）
- 评论
> 存入数据库后、从数据库中取出 并显示</br>
> 此时【评论】 被解析部分被人为操作

- 正常来说是：
	- `输入评论：老板最棒最漂亮！`
 	- 就会显示：`<span>cc123nice说：老板最棒最漂亮！</span>`

 - 也可被人为写成
 	- `输入评论： <script>alert(1)</script>`
 	- 就会显示：`<span>cc123nice说：<script>alert(1)</script></span> `
 >对于script标签会被解析执行 导致xss


## 二、react防止xss攻击
### （1）自动转义

- React 在渲染 HTML 内容和渲染 DOM 属性时都会将 "'&<> 这几个字符进行转义

### （2）JSX 语法

- JSX 实际上是一种语法糖，Babel 会把 JSX 编译成 React.createElement() 的函数调用，最终返回一个 ReactElement

## 三、react可能发生漏洞
### （1）使用dangerouslySetInnerHTML
- 类似原生html直接拼接 不做赘述
### （2）使用用户输入的值来渲染 a 标签的 href 属性，或类似 img 标签的 src 属性等
```jsx
const userWebsite = "javascript:alert('xss');";
<a href={userWebsite}></a>
```
## 四、防御方法

### （1）浏览器自带防御 （X-XSS-Protection ）
> 这种浏览器自带的防御功能只对反射型 XSS 有一定的防御力，其原理是检查 URL 和 DOM 中元素的相关性，但这并不能完全防止反射型 XSS，而且也并不是所有浏览器都支持 X-XSS-Protection。
- HTTP X-XSS-Protection 响应头是 Internet Explorer，Chrome 和 Safari 的一个功能，当检测到跨站脚本攻击(XSS)时，浏览器将停止加载页面。

### （2）转义
> 主要就是对输入所包含的特殊字符进行转义，如 <，>，&，"，'，来防止 XSS 攻击。

- 当有大坏人想通过
	- 输入`<script>alert(1)</script>` 引发xss时
	- 输入的东西会先被转译成 `"&lt;script&gt;alert(1)&lt;/script&gt;"`

>转译后存入后端，当从数据库取出在前端显示时，html会自动转译回去 但并不是真正的<,>而是 &lt;&gt

### （3）CSP内容安全策略
> CSP 的实质就是白名单制度，开发者明确告诉客户端，哪些外部资源可以加载和执行，等同于提供白名单。它的实现和执行全部由浏览器完成，开发者只需提供配置。
> 两种方法可以启用 CSP。
- 一种是通过 HTTP 头信息的 Content-Security-Policy 的字段。
 	` Content-Security-Policy: script-src 'self';...`
- 另一种是通过网页的<meta>标签。
	`<meta http-equiv="Content-Security-Policy" ... />`

>其中不符合的会被过滤 阻止可能是xss威胁的js加载