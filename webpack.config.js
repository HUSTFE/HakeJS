var webpack = require('webpack');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var path = require('path');

var libraryName = 'Hake';

var plugins = [], outputFile;

module.exports = function (env) {
  if (env === 'build') {
    plugins.push(new UglifyJsPlugin({ minimize: true }));
    outputFile = libraryName + '.min.js';
  } else {
    outputFile = libraryName + '.js';
  }

  var config = {
    entry: __dirname + '/src/index.js',
    devtool: 'source-map',
    output: {
      path: __dirname + '/lib',
      filename: outputFile,
      library: libraryName,
      libraryTarget: 'umd',
      umdNamedDefine: true
    },
    module: {
      loaders: [
        {
          test: /(\.js)$/,
          loader: 'babel-loader',
          exclude: /(node_modules|bower_components)/
        },
        {
          test: /(\.js)$/,
          loader: "eslint-loader",
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.json'],
      modules: [path.join(__dirname, 'src'), 'node_modules']
    },
    plugins: plugins
  };

  return config;
};
