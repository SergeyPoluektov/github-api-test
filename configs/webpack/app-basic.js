const path = require('path')
const webpack = require('webpack')
const projectPaths = require('../path.js')


module.exports = (env = {}, args) => ({
	mode: env.production ? 'production' : 'development',
	entry: path.join(projectPaths.source, 'index.js'),
	output: {
		path: projectPaths.build,
		filename: '[name].bundle.js',
		publicPath: '/',
	},
	resolve: {
		modules: [ projectPaths.source, 'node_modules' ],
	},
	optimization: {
		splitChunks: {
			chunks: 'all',
		},
	},
})
