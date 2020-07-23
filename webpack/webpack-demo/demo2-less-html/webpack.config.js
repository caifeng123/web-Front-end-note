/*
 * @Author: cc123nice
 * @Date: 2020-07-22 16:52:35
 * @LastEditTime: 2020-07-22 21:27:32
 * @Description: my progamme description
 * @FilePath: \webpack\demo2\webpack.config.js
 */ 
const HtmlWebpack = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
  entry:{
    index:"./src/index.js"
  },
  mode:'development',
  module:{
    rules:[
      {
        test:/\.css$/,
        use:ExtractTextPlugin.extract({
          fallback: 'style-loader',
          //如果需要，可以在 sass-loader 之前将 resolve-url-loader 链接进来
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
  },
  plugins: [
    new HtmlWebpack({
      template:'./src/index.html'
    }),
    new ExtractTextPlugin("style.css")
  ]
}