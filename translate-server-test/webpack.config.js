const path = require("path");

module.exports = {
  mode: "development",
  entry: ["@babel/polyfill", "./src/main"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      }
    ]
  },
  target: 'node'
};
