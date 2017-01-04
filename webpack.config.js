var webpack = require("webpack");

module.exports = {
	entry: './assets/js/app.js',
	output: {
		path: './build',
		filename: 'bundle.min.js'
	},
  plugins: [
    new webpack.optimize.UglifyJsPlugin({minimize: true})
  ],
	module: {
		loaders: [
			{
				test: /\.(js|jsx)?$/,
				exclude: /node_modules/,
				loader: 'babel',
				query: {
					presets: ['es2015', 'react']
				}
			},
			{
				test: /\.scss?$/,
				loaders: ['style', 'css', 'postcss', 'sass']
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2|png|jpg|jpeg|gif)(\?.*$|$)/,
				loader: 'file?name=[path][name].[ext]?[hash]'
			}
		]
	}
};
