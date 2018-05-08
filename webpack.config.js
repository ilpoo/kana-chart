const debug = process.env.NODE_ENV !== "production";
const webpack = require('webpack');
const PurifyCSSPlugin = require('purifycss-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractSass = new ExtractTextPlugin('styles.min.css');
const extractHtml = new ExtractTextPlugin('index.html');

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
            plugins: [
              'react-html-attrs', 
              'transform-class-properties', 
              'transform-decorators-legacy',
            ],
          }
        },
      },
      {
        test: /\.scss$/,
        exclude: /(node_modules)/,
        use: extractSass.extract({
          fallback: 'style-loader',
          use: [
            'raw-loader', 
            'sass-loader',
          ],
        }),
      },
      {
        test: /\.html$/,
        use: extractHtml.extract({
          use: [
            'raw-loader',
            // 'html-minifier-loader',
          ],
        }),
      },
    ],
  },
  output: {
    path: __dirname + "/public",
    filename: "scripts.min.js",
  },
  plugins: debug ? [
    extractSass,
    extractHtml,
  ] : [
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production'),
      },
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      sourcemap: false,
      comments: false,
      compress:{
        dead_code: true,
        drop_debugger: true,
        conditionals: true,
        booleans: true,
        unused: true,
        join_vars: true,
        drop_console: true,
        keep_fargs: false,
      },
    }),
    extractSass,
    extractHtml,
    new PurifyCSSPlugin({
      purifyOptions: {
        info: true,
        minify: true,
      },
    }),
  ],
};
