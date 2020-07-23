/*
 * @Author: cc123nice
 * @Date: 2020-07-23 21:09:38
 * @LastEditTime: 2020-07-23 22:04:41
 * @Description: my progamme description
 * @FilePath: \webpack\demo6-react\webpack.config.js
 */ 
const HtmlWebpack = require('html-webpack-plugin')
module.exports = {
  mode:'development',
  entry:'./src/index.js',
  module:{
    rules:[
      {
        test:/\.(js|jsx)$/,
        use:[{
          loader:"babel-loader",
          options:{
            presets:[
              "@babel/preset-react",
              "@babel/preset-env"
            ]
          }
        }]
      },
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
    ]
  },
  plugins:[
    new HtmlWebpack({
      template:'./src/index.html'
    })
  ]
}