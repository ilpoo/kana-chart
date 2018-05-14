const debug = process.env.NODE_ENV !== "production";
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const data = require("./data");
const HtmlWebpack = new HtmlWebpackPlugin({
  template: 'src/template.ejs',
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
  data,
});
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const distributor = require("./distributor");


module.exports = {
  context: __dirname,
  devtool: debug ? "inline-sourcemap" : false,
  mode: debug ? "development" : "production",
  entry: {
    main: ["babel-polyfill", "./src/index.tsx"],
    worker: "./src/worker.js",
  },
  output: {
    path: __dirname + "/dist",
    globalObject: "this",
    // filename: "main.js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  module:{
    rules: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          query: {
            presets: [
              'react',
              'es2015',
              'es2016',
              'es2017',
              'stage-0',
            ],
          }
        },
      },
      {
        test: /\.tsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            query: {
              presets: [
                'react',
                'es2015',
                'es2016',
                'es2017',
                'stage-0',
              ],
            },
          },
          "ts-loader",
        ],
      },
    ],
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        parallel: true,
        uglifyOptions: {
          sourcemap: debug,
          compress: {
            drop_console: !debug,
            keep_fargs: false,
            passes: 2,
          },
        },
      }),
    ],
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
