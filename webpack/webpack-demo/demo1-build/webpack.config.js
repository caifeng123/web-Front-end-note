/*
 * @Author: cc123nice
 * @Date: 2020-07-22 14:12:58
 * @LastEditTime: 2020-07-22 16:47:47
 * @Description: my progamme description
 * @FilePath: \webpack\demo1\webpack.config.js
 */

const path = require('path')
const HtmlWebpack = require('html-webpack-plugin')
module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
    home: './src/home.js',
    page: './src/page.js'
  },
  output: {
    filename: '[name].[hash:8].js',
    path:path.join(__dirname,'release')
  },
  plugins: [
    new HtmlWebpack()
  ]
}