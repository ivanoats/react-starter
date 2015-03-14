var webpack = require('webpack');
var path = require('path');

module.exports = {
  devtool: 'eval',
  cache: true,
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './hot/entry'
  ],
  contentBase: path.join(__dirname, '/hot'),
  output: {
    path: path.join(__dirname, 'app'),
    filename: 'bundle.js',
    publicPath: '/app/js-dist/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ },
      { test: /\.css$/, loader:  'style!css?importLoaders=1' },
      { test: /\.(svg|eot|woff|ttf|png)$/, loader:  'file'},
      { test: /\.scss$/, loader: 'style!css!sass?outputStyle=expanded' }
    ]
  }
};
