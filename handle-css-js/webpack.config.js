const path = require('path')

/**
 * Plugins
 * Terser plugin used to minify JS bundle, it comes by default with webpack v5 -> No need to install it!
 * MiniCssExtractPlugin used to extract a separate CSS file
 * CleanWebpackPlugin used to remove directories and files from the output folder before generating enw files
 */
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// You can use clean property instead! But the options are limited
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
/**
 * Can be used to generate html templates and/or to reference hashed assets
 * If we use Pug template engine, html-webpack-plugin isn't needed!
 */
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const PugPlugin = require('pug-plugin')

module.exports = {
	// Can be included using .pug -> require
	// entry: './src/index.js',
	entry: {
		index: './src/index.pug'
	},
	output: {
		// filename: 'bundle.js',
		filename: 'bundle.[contenthash].js',
		path: path.resolve(__dirname, 'dist'),
		// Used also to reference hashed assets (Styles and scripts)
		// publicPath: 'dist/',
		publicPath: ''
		// clean: true,
		/* clean: {
			dry: true,
			keep: /\.css$/i // Keep css files
		} */
	},
	mode: 'none',
	module: {
		rules: [
			{
				test: /\.pug$/i,
				use: ['pug-loader']
			},
			{
				test: /\.(png|jpg|jpeg)$/,
				type: 'asset',
				parser: {
					dataUrlCondition: {
						maxSize: 3 * 1024
					}
				}
			},
			{
				test: /\.txt/,
				type: 'asset/source'
			},
			{
				test: /\.css$/,
				// Dev mode
				// use: ['style-loader', 'css-loader']
				// Prod mode
				use: [MiniCssExtractPlugin.loader, 'css-loader']
			},
			{
				test: /\.scss$/,
				// Dev mode
				// use: ['style-loader', 'css-loader', 'sass-loader']
				// Prod mode
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/env'],
						plugins: ['@babel/plugin-proposal-class-properties']
					}
				}
			}
		]
	},
	plugins: [
		new TerserPlugin(),
		new MiniCssExtractPlugin({
			// filename: 'styles.css',
			filename: 'styles.[contenthash].css'
		}),
		/**
		 * You can use clean property instead, but the options are limited
		 * Default configuration (No options) works for output folder
		 */
		new CleanWebpackPlugin({
			cleanOnceBeforeBuildPatterns: [
				// Remove all output subdirectories
				'**/*',
				// Remove specific dir or file
				path.resolve(process.cwd(), 'build/**/*')
			]
		}),
		new HtmlWebpackPlugin({
			template: './src/index.pug'
		})
	]
}
