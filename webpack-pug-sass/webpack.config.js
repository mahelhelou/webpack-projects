const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
	entry: {
		main: './src/index.js'
	},
	output: {
		filename: '[name].[contenthash:8].js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: /\.pug$/i,
				use: [
					{
						loader: 'pug-loader'
					}
				]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.pug'
		})
	]
}

module.exports = config
