/*
 * @Author: cc123nice
 * @Date: 2020-07-26 15:25:04
 * @LastEditTime: 2020-07-26 16:42:17
 * @Description: my progamme description
 * @FilePath: \webpack\teachdemo\webpack.pro.config.js
 */
const path = require('path')
const HtmlWebpack = require('html-webpack-plugin')
const webpack = require('webpack');
module.exports = {
  mode: "production",
  entry: {
    index1: "./src/index.js",
    index2: "./src/haha.js",
    // main:"./src",
  },
  output: {
    filename: '[name].[hash:8].js',
    //path控制输出文件夹的名字 [默认dist]
    // path:path.join(__dirname,'hanhan')	
  },
  devServer: {
    contentBase: './dist',
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader"
        ]
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          "less-loader"
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpack({
      template: './src/index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),	//需要在上方导入webpack
  ]
}