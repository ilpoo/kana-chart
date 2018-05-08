const debug = process.env.NODE_ENV !== "production";
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpack = new HtmlWebpackPlugin({
  template: 'js/template.ejs',
  filename: 'index.html',
  minify: debug ? false : {
    removeAttributeQuotes: true,
    collapseWhitespace: true,
    html5: true,
    minifyCSS: true,
    removeComments: true,
    removeEmptyAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
  },
  hash: true,
});
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");


module.exports = {
  context: __dirname,
  devtool: debug ? "inline-sourcemap" : false,
  mode: debug ? "development" : "production",
  entry: "./js/index.js",
  module:{
    rules: [
      // {
      //   test: /\.json$/,
      //   use: 'json-loader',
      // },
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          query: {
            presets: [
              'react', 
              'es2015', 
              'stage-0',
            ],
          }
        },
      },
    ],
  },
  optimization: {
    minimizer: debug ? [] : [
      new UglifyJsPlugin({
        parallel: true,
        uglifyOptions: {
          sourcemap: false,
          compress: {
            drop_console: true,
            keep_fargs: false,
            passes: 2,
          },
        },
      }),
    ],
  },
  output: {
    path: __dirname + "/public",
    filename: "scripts.min.js",
  },
  plugins: debug ? [
    HtmlWebpack,
  ] : [
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production'),
      },
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    HtmlWebpack,
  ],
};
