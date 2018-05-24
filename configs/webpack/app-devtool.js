const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const CleanPlugin = require('clean-webpack-plugin')
const projectPaths = require('../path.js')


const plugins = [
 /*  new CleanPlugin([ projectPaths.build ], { */
		// allowExternal: true,
		// exclude: [ 'lib' ],
	/* }), */
]

module.exports = (env = {}, args) => ({
	devtool: env.production ? 'source-map' : 'cheap-module-source-map',
	devServer: {
		contentBase: false,
		historyApiFallback: true,
	},
	plugins: env.production ? plugins : plugins.concat([
		new FriendlyErrorsPlugin({
			clearConsole: true,
		}),
	]),
})
