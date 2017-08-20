const path = require('path')

const config = {
  entry: {
    pageOne:'./src/chart.js',
    pageTwo:'./src/hist.js' 
                       } ,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      { test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
}

module.exports = config