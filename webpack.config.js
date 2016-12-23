var debug = process.env.NODE_ENV !== "production";
debug=false;
var webpack = require('webpack');

module.exports = {
	context: __dirname,
	devtool: debug ? "inline-sourcemap" : null,
	entry: "./js/scripts.js",
	module:{
		loaders:[
			{
				test: /\.json$/,
				loader: 'json-loader'
			},
			{
				test: /\.js?$/,
				exculde: /(node_modules|bower_components)/,
				loader: 'babel-loader',
				query: {
					presets: ['react', 'es2015', 'stage-0'],
					plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy']
				}
			}
		]
	},
	output: {
		path: __dirname + "/js",
		filename: "scripts.min.js"
	},
	plugins: debug ? [] : [
		new webpack.DefinePlugin({
			'process.env':{
				'NODE_ENV': JSON.stringify('production')
			}
		}),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
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
			}
		}),
	],
};