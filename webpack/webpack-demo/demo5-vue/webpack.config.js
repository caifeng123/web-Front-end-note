/*
 * @Author: cc123nice
 * @Date: 2020-07-23 15:30:41
 * @LastEditTime: 2020-07-23 17:20:30
 * @Description: my progamme description
 * @FilePath: \webpack\demo5-vue\webpack.config.js
 */ 
const HtmlWebpack = require('html-webpack-plugin')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
  mode:'development',
  entry:'./src/index.js',
  devServer:{
    contentBase:'./dist',
    hot:true
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      // 它会应用到普通的 `.js` 文件
      // 以及 `.vue` 文件中的 `<script>` 块
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      // 它会应用到普通的 `.css` 文件
      // 以及 `.vue` 文件中的 `<style>` 块
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'less-loader'
        ]
      }
    ]
  },
  plugins:[
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpack({
      template:'./src/index.html'
    })
  ]
}