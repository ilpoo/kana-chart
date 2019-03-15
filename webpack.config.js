const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const debug = process.env.NODE_ENV !== "production";
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
  data,
});
require("./distributor");


module.exports = {
  context: __dirname,
  devtool: debug ? "inline-sourcemap" : false,
  mode: debug ? "development" : "production",
  entry: {
    main: ["@babel/polyfill/noConflict", "./src/main.tsx"],
    worker: ["@babel/polyfill/noConflict", "./src/serviceWorker/worker.ts"],
  },
  output: {
    path: __dirname + "/dist",
    globalObject: "this",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  module:{
    rules: [
      {
        test: /\.(?:j|t)sx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          query: {
            plugins: [
              "@babel/proposal-class-properties",
            ],
            presets: [
              [
                "@babel/env",
                {
                  targets: {
                    "browsers": ["last 2 versions"],
                  },
                },
              ],
              "@babel/react",
              "@babel/typescript",
            ],
          }
        },
      },
    ],
  },
  optimization: {
    minimize: !debug,
  },
  plugins: debug ? [
    HtmlWebpack,
  ] : [
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production'),
      },
    }),
    // TS claims this function needs one parameter, but I couldn't
    // figure out from the Webpack docs what that should be. It works
    // though, so I'm not touching it. Ignore it is.
    //@ts-ignore
    new webpack.optimize.OccurrenceOrderPlugin(),
    HtmlWebpack,
  ],
};
