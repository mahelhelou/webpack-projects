const path = require('path')

const config = {
	entry: './src/index.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
		// publicPath: '/dist/'
	},
	mode: 'none',
	module: {
		// If there's no rule for images, webpack will fail to deal with image import in AddImage.js file
		rules: [
			{
				test: /\.{jpg|jpeg|png}$/i,
				/**
				 * asset/resource : Equivalent to file-loader -> copy resource to output directory (Use for large files).
				 * asset/inline: Equivalent to url-loader -> Generates base64 bytes reference link (Use for small files).
				 * asset/source: Equivalent to raw-loader.
				 * asset: Equivalent to url-loader with a limit size.
				 */
				// type: 'asset/resource',
				type: 'asset',
				parser: {
					dataUrlCondition: {
						maxSize: 3 * 1024 // Set the limit to 3KB
					}
				}
			},
			{
				test: /\.txt$/i,
				type: 'asset/source'
			}
		]
	}
}

module.exports = config
