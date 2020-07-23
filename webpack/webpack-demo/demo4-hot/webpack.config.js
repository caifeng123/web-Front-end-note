/*
 * @Author: cc123nice
 * @Date: 2020-07-23 09:12:07
 * @LastEditTime: 2020-07-23 10:05:00
 * @Description: my progamme description
 * @FilePath: \webpack\demo4-hot\webpack.config.js
 */ 
const HtmlWebpack = require('html-webpack-plugin')
const webpack = require('webpack');
module.exports = {
  entry:{
    index:'./src/index.js'
  },
  mode:'development',
  devServer:{
    contentBase:'./dist',
    hot:true
  },
  plugins:[
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpack({
      title:'hot module',
      template:"./src/index.html"
    })
  ]
}