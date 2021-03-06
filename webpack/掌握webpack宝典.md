### 一、初步搭建

#### 1、初始化package.json

```shell
yarn init -y
npm init -y
```

> npm会比yarn多scripts 对象 
>
> 作用：便捷指令

```json
//package.json
{
  "name": "demo1",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "scripts": {
    //"test": "echo \"Error: no test specified\" && exit 1"			//初始化生成
    "build": "webpack"																					//webpack命令
  },
  "keywords": [],
  "author": "",
  "description": ""
}
```



#### 2、安装webpack

> 使用开发者依赖即可

```shell
yarn add -D webpack webpack-cli
```



#### 3、初步实现配置

> 0、根目录下 创建webpack.config.js 

> 1、实现打包文件 自动生成html 并会在html中导入
>
> - 安装 html-webpack-plugin 包
> -  webpack.config.js 导入包+plugins新建实例
>
> 2、入口文件设置输出
>
> - 利用entry设置文件对应打包后的文件名
>
> ```js
> entry:{
>   index:'./src/index.js',
>   home:'./src/home.js',
>   page:'./src/page.js'
> }
> ```
>
> - 利用output重构打包后的文件名
>
> ```js
> //会重新构成打包后的文件名
> //[name] 对应上面entry的key值
> //[hash] 随机生成的hash值 :8 是剪切前6位
> output:{
> 	filename:'[name].[hash:8].js',
>     
>   //path控制输出文件夹的名字 [默认dist]
>   path:path.join(__dirname,'release')			//前提导入path模块 需要用绝对路径!!
> },
> ```

```js
const path = require('path')
const HtmlWebpack = require('html-webpack-plugin')
module.exports = {
  //1.编译打包模式[production/development]
  mode: 'development',
  //2.入口文件设置{换而言之=>要打包的文件} //多入口写法
  entry: {
    index: './src/index.js',
    home: './src/home.js',
    page: './src/page.js'
  },
  //3.出口文件设置{对打包好的文件格式化文件名+修改出口文件夹}
  output: {
    filename: '[name].[hash:8].js',
    path:path.join(__dirname,'release')
  },
  //4.插件设置=>具体看文档 此处用到自动生成html
  //html中自动导入打包好的js
  //其中的template指向预定好的模板
  plugins: [
    new HtmlWebpack({
      template:'./src/index.html'
    })
  ]
}
```



### 二、进阶之loaders篇

#### 1、样式

- [`style-loader`](https://www.webpackjs.com/loaders/style-loader) 将模块的导出作为样式添加到 DOM 中
- [`css-loader`](https://www.webpackjs.com/loaders/css-loader) 解析 CSS 文件后，使用 import 加载，并且返回 CSS 代码

- [`less-loader`](https://www.webpackjs.com/loaders/less-loader) 加载和转译 LESS 文件
- [`sass-loader`](https://www.webpackjs.com/loaders/sass-loader) 加载和转译 SASS/SCSS 文件

> 在module中添加规则 

```js
module:{
  rules:[
    {
      test:/\.(css|less|scss)$/,
      use:['style-loader','css-loader','less-loader']
    }
  ]
},
```

> *注意：要使用  `less-loader`需要先安装  less-loader和  less*

**补充：设置全局的颜色less，可在其他地方引用 @import xxx**

```less
//base.less
@primary-color:#ccc;
@background-color:#000;

//index.less
@import './base.less';
.haha{
  color: @primary-color;
  background-color:@background-color
}
```



#### <a id="css">2、如何build出对应的样式文件</a>

> 需要安装对应插件*从 bundle 中提取文本（CSS）到单独的文件*

```shell
npm install --save-dev extract-text-webpack-plugin
```

将webpack.config.js的module修改一下

- 1、通过require引入该库
- 2、先在plugins中注册一份ExtractTextPlugin
- 3、将rules中每一项设置一个use 

```js
//1.引入该库
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports={
  //...省略代码...
  
  //2.在plugins中注册一份ExtractTextPlugin
  plugins: [
     new ExtractTextPlugin("style.css")
  ],
  module:{
    //3.将rules中每一项设置一个use 
    //通过ExtractTextPlugin的extract-api 去指定loader
      rules:[
        {
          test:/\.css$/,
          use:ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader'
          })
        },
        {
          test:/\.less$/,
          // use:['style-loader','css-loader','less-loader']
          use:ExtractTextPlugin.extract({
            fallback: 'style-loader',
            //如果需要，可以在 sass-loader 之前将 resolve-url-loader 链接进来
            use: ['css-loader','less-loader']
          })
        }
      ]
   }
}
```

*补充 ：可能会报错`DeprecationWarning: Tapable.plugin is deprecated. Use new API on '.hooks' instead`*

此处只需将版本更新即可 `npm install extract-text-webpack-plugin@next`

#### 3、webpack转换typescript

**1、常规转换typescript方式**

> - 通过全局安装 tsc
> - 在通过tsc编译ts文件 此时会在ts文件夹下 生成转换后的js文件

```shell
//全局安装 tsc
npm install -g tsc
//tsc编译
tsc xxx.ts
```

**2、webpack方式转换typescript**

> - 安装ts-loader 和 typescript 

```shell
yarn add -D ts-loader typescript
```

> - 修改webpack.config.js文件下的module

```js
  module:{
    rules:[
      {
        test:/\.ts$/,
        loader:'ts-loader'
      }
    ]
  }
```

> - 添加一个 在根目录下`tsconfig.json` 文件 【固定写死】

```json
{
  "compilerOptions": {
    "sourceMap": true
  }
}
```



### 三、进阶之 热部署

#### 1、 概念：

> 它允许在运行开发时更新各种模块，而无需进行完全刷新。
>
> 换而言之：修改js，vue保存后，即可自动编译+刷新页面 无需重新手动编译

#### 2、热部署方式（1）

> - 引入 webpack  `const webpack = require('webpack');`
> - 增加devServer项 【固定！】
> - plugins加入插件 `new webpack.HotModuleReplacementPlugin()`

```js
    const HtmlWebpack = require('html-webpack-plugin')
+		const webpack = require('webpack');
    module.exports = {
      entry:{
        index:'./src/index.js'
      },
      mode:'development',
+     devServer:{
+       contentBase:'./dist',
+       hot:true
+     },
      plugins:[
+       new webpack.HotModuleReplacementPlugin(),	//需要在上方导入webpack
        new HtmlWebpack({
          title:'hot module',
          template:"./src/index.html"
        })
      ]
    }
```

> 修改package.json 的 指令
>
> - 安装  热部署的库 `npm install -D webpack-dev-server` 
> - 在scripts中添加dev指令 即运行 `webpack-dev-server`

```json
  "scripts": {
    "build": "webpack",
    "dev": "webpack-dev-server"
  },
```

*注意:x:：修改html并不能使用热部署！！ 因为html并没有放在webpack.config.js文件中打包*

#### 3、热部署方式（2）

此处放置[通过 Node.js API]([https://www.webpackjs.com/guides/hot-module-replacement/#%E9%80%9A%E8%BF%87-node-js-api](https://www.webpackjs.com/guides/hot-module-replacement/#通过-node-js-api))官网链接 实用起来感觉没必要（东西太多+我懒~~）



### 四、开发和生产环境的不同配置方法

#### 1、定义

开发环境：dev 	  

生产环境：build	

|          | 常用命令 | webpack.config.js  |
| :------: | :------: | :----------------: |
| 开发环境 |   dev    | mode:'development' |
| 生产环境 |  build   | mode:'production'  |

#### 2、同时配置方法

> 设置两个不同的	`webpack.prod.config.js`  即可 *注意 名字不能相同！！！*

修改其中的 mode

- 开发环境下的mode =》mode:'development'

- 生产环境下的mode =》mode:'production'

> 修改package.json的命令入口文件

```json
  "scripts": {
    "build": "webpack --config webpack.prod.config.js",
    "dev": "webpack-dev-server --config webpack.config.js"
  },
```





### 五、手动配置vue的webpack

#### 1、安装vue包和对应的loader

```shell
npm install -D vue-loader vue vue-template-compiler
npm install -D babel-loader @babel/core
```

#### 2、配置webpack.config.js

*要想在vue中使用 less* lang="less" 

```less
<style lang="less" scoped>
  .contain{
    font-size: 20px;
    .first{
      color: red;
    }
    .second{
      color: brown;
    }
  }
</style>
```

> **需要修改webpack.config.js**

```js
//webpack.config.js   
		const HtmlWebpack = require('html-webpack-plugin')					//build生成html
    const webpack = require('webpack')
+   const VueLoaderPlugin = require('vue-loader/lib/plugin')		//vue的loader
    module.exports = {
      mode:'development',
      entry:'./src/index.js',
      //热部署
      devServer:{
        contentBase:'./dist',
        hot:true
      },
      module: {
        rules: [
+         {
+           test: /\.vue$/,
+           loader: 'vue-loader'
+         },
          // 它会应用到普通的 `.js` 文件
          // 以及 `.vue` 文件中的 `<script>` 块
+         {
+           test: /\.js$/,
+           loader: 'babel-loader'
+         },
          // 它会应用到普通的 `.css` 文件
          // 以及 `.vue` 文件中的 `<style>` 块
          {
+           test: /\.css$/,
+           use: [
+             'vue-style-loader',
+             'css-loader'
+           ]
          }
        ]
      },
      plugins:[
        //vueloader插件注册
+       new VueLoaderPlugin(),			
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpack({
          template:'./src/index.html'
        })
      ]
    }
```



### 六、手动配置React的webpack

#### 1、安装react包和对应的loader

*注意：*babel-loader一定要装上 @babel/core

```shell
yarn add react react-dom	
yarn add -D babel-loader @babel/core
yarn add @babel/preset-env --dev
yarn add @babel/preset-react --dev
```

#### 2、配置webpack.config.js

> 添加在 module中添加 rules

```js
  module.exports = {
  mode:'development',
  entry:'./src/index.js',
  module:{
+  rules:[
+     {
+       test:/\.(js|jsx)$/,
+       use:[{
+         loader:"babel-loader",
+          options:{
+            presets:[
+              "@babel/preset-react",
+              "@babel/preset-env"
+            ]
+          }
+        }]
+      }]
+  	 }
+  }
	}
```



### 七、总结

#### 1、匹配css与less文件 对应所需的loader

|        | css                        | less                                         | scss                                         |
| :----: | :------------------------- | -------------------------------------------- | -------------------------------------------- |
| loader | style-loader<br/>css-loade | style-loader <br/>css-loader<br/>less-loader | style-loader <br/>css-loader<br/>sass-loader |

#### 2、两种匹配写法（简单法/可提取css文件法）

> 基本写法

```
{
        test:/\.css$/,
        use:[
          "style-loader",
          "css-loader"
        ]
      },
      {
        test:/\.less$/,
        use:[
          "style-loader",
          "css-loader",
          "less-loader"
      	]
			}
}
```

>可提取css文件法 [点击查看](#css)
