# babel学习笔记

### 0、基础

我们先看看 `Babel` 能够做什么：

- 语法转换
- 通过 `Polyfill` 方式在目标环境中添加缺失的特性(`@babel/polyfill模块`)
- 源码转换(codemods)

### 1、起步

```shell
npm install --save-dev @babel/core @babel/cli @babel/preset-env
npm install --save @babel/polyfill
```

### 2、配置文件

创建` babel.config.json` 配置文件

```json
//样例
{
  "presets": [
    [
      //预设
      "@babel/env",
      {
        //目标浏览器版本
        //也可设置browserslist 将使用默认配置> 0.5%, last 2 versions, Firefox ESR, not dead。
        "targets": {
          "edge": "17",
          "firefox": "60",
          "chrome": "67",
          "safari": "11.1"
        },
        //
        "useBuiltIns": "usage",
        "corejs": 3
      }
    ]
  ],
  //下载需要的插件 并将其对应的放入即可
  "plugins": []
}
```

**参数分析**

- preset-预设

  - 官方推荐 env 会根据你配置的目标环境，生成插件列表来编译。

  > 因为语法转换只是将高版本的语法转换成低版本的，但是新的内置函数、实例方法无法转换。
  >
  > 例如 箭头函数 reduce函数 会被转换成低版本， 但 promise /async/await 还有 class等 这种内置方法并不可以，因此就需要polyfill

- polyfill-垫片（转换内置函数/方法）*被废弃！！*

  - 由于已被废弃 不再展示 但有引导作用

  > 原因是太大了！虽然能帮助转换 但每次需要转换时，就必须要将其全部引入（多达89K！）会将不必要的在引入至全局。憨不憨？但如何解决嫩？ babel官方已经给出方法了 接着看！

- useBuiltIns-位于预设中的参数 上方演示代码有

  - 官方推荐 usage 

  > 顾名思义 当我需要垫片polyfill去转换内置方法时 会自动加载所需要的 即按需加载！ 
  >
  > 在文件需要的位置单独按需引入，可以保证在每个bundler中只引入一份。当前模式类似于@babel/plugin-transform-runtime，polyfill局部使用，制造一个沙盒环境，不造成全局污染。但是当你组件过多时呢？会重复打包相同的代码，因此我们可以看下方的entry
  >
  > 但要注意corejs参数问题 下面有解析

  - entry

  > 需要在项目入口处引入import "@babel/polyfill”; 
  >
  > 看起来是全局导入，但不同的是 插件@babel/preset-env会将把@babel/polyfill根据实际需求打散，只留下必须的。实际上编译时会只import需要的core-js/xxx

  - false 此为默认参数

  > 啥都别搞 我自己plugins

- core-js - 核心块

  - 不晓得这是干什么的？ 看看上面示例代码 他是跟着useBuiltIns一起的！

  >当用`useBuiltIns:usage` 必须要同时设置 `corejs` (如果不设置，会给出警告，默认使用的是"corejs": 2) ，注意: 这里仍然需要安装 `@babel/polyfill`(当前 `@babel/polyfill` 版本默认会安装 "corejs": 2):

  > 首先说一下使用 `core-js@3` 的原因，`core-js@2` 分支中已经不会再添加新特性，新特性都会添加到 `core-js@3`。例如你使用了 `Array.prototype.flat()`，如果你使用的是 `core-js@2`，那么其不包含此新特性。为了可以使用更多的新特性，建议大家使用 `core-js@3`。

- plugins *关注`@babel/plugin-transform-runtime` 插件！！*

  - 当你有一些和浏览器没关系的转换要求？

  > 不怕 plugins满足你 看官网找到对应的[plugin](https://www.babeljs.cn/docs/plugins) ,
  >
  > 1、安装
  >
  > 2、写在` babel.config.json`的plugins数组中即可！ easy

  - 此时不得不提刚刚说到的*`@babel/plugin-transform-runtime` 插件*

  > 即使我们有了神器按需加载，但当我们用到同一个转换方法或`class转换低版本`时也会被重复 import 这反而会使代码增大！！
  >
  > 这个时候，就是 `@babel/plugin-transform-runtime` 插件大显身手的时候了，使用 `@babel/plugin-transform-runtime` 插件，所有帮助程序都将引用模块 `@babel/runtime`，这样就可以避免编译后的代码中出现重复的帮助程序，有效减少包体积。

  - 如何使用呢？

  > ```shell
  > npm install --save-dev @babel/plugin-transform-runtime
  > npm install --save @babel/runtime
  > ```
  >
  > plugins中引入即可！

  **##最终版##**

  ```json
  {
    "presets": [
      [
        "@babel/preset-env"
      ]
    ],
    "plugins": [
      [
        "@babel/plugin-transform-runtime",
        {
          "corejs": 3
        }
      ]
    ]
  }
  ```

  

### 3、调用编译(命令方式)

> 调用babel命令 将src中的文件 编译后放到lib中

 ```shell
./node_modules/.bin/babel src --out-dir lib
	或
npx babel src --out-dir lib
 ```

**npx 与 npm区别**

npx是一个工具，就像npm极大地提升了我们安装和管理包依赖的体验，在npm的基础之上，npx让npm包中的命令行工具和其他可执行文件在使用上变得更加简单。它极大地简化了我们之前使用纯粹的npm时所需要的大量步骤。

主要特点：

1、临时安装可执行依赖包，不用全局安装，不用担心长期的污染。

2、可以执行依赖包中的命令，安装完成自动运行。

3、自动加载node_modules中依赖包，不用指定$PATH。*此处的编译命令即用到了这个特点*

4、可以指定node版本、命令的版本，解决了不同项目使用不同版本的命令的问题。

