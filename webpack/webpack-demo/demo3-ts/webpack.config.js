/*
 * @Author: cc123nice
 * @Date: 2020-07-22 22:20:50
 * @LastEditTime: 2020-07-22 22:22:36
 * @Description: my progamme description
 * @FilePath: \webpack\demo3\webpack.config.js
 */ 
module.exports = {
  entry:{
    index:'./src/index.ts'
  },
  mode:'development',
  module:{
    rules:[
      {
        test:/\.ts$/,
        loader:'ts-loader'
      }
    ]
  }
}