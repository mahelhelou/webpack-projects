const path = require('path')
const postCSSPlugins = [require('postcss-simple-vars'), require('postcss-nested'), require('autoprefixer')]

const config = {
	entry: {
		main: './app/assets/scripts/App.js'
	},
	// If no output prop, Webpack ^4 will create /dist/main.js in the root
	output: {
		filename: '[name].[contenthash].js',
		path: path.resolve(__dirname, 'app'),
		clean: true
	},
	devtool: 'inline-source-map',
	devServer: {
		static: {
			directory: path.join(__dirname, 'app')
		},
		// Inject CSS and JS on the fly -> No browser reload
		hot: true,
		// Launch the browser automatically
		// open: true,
		port: 3000,
		// Share the local live server with other screens on the same network
		host: '0.0.0.0'
	},
	mode: 'development',
	// Not needed if we used devServer
	// watch: true,
	module: {
		rules: [
			{
				test: /\.css$/i,
				// Usage of these plugins is from right to left!
				use: ['style-loader', 'css-loader', { loader: 'postcss-loader', options: { postcssOptions: { plugins: postCSSPlugins } } }]
			}
		]
	}
}

module.exports = config
