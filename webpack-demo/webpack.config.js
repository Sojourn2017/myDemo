// webpack.config.js

const path = require('path'); // 使用node.js中的path模块

module.exports = {
  mode: "development",     // 设置模式为development,("production" | "development" | "none")
  entry: './src/index.js',   // 入口文件
  output: {
    filename: 'bundle.js',   // 打包输出文件名
    path: path.resolve(__dirname, 'dist')    // 打包输出目录
  }
};