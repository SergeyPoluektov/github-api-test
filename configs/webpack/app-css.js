const path = require('path')
const autoprefixer = require('autoprefixer')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const projectPaths = require('../path.js')


const browsers = [ 'last 2 versions' ]

const cssLoaders = [ {
	loader: 'css-loader',
	options: {
		url: false,
		import: false,
		modules: true,
		localIdentName: '[path][name]__[local]--[hash:base64:5]',
		sourceMap: true,
		// 0 => no loaders(default); 1 => postcss-loader; 2 => postcss-loader, sass-loader
		importLoaders: 5,
		camelCase: 'dashesOnly',
		minimize: false,
	},
},
{
	loader: 'postcss-loader',
	options: {
		sourceMap: true,
		plugins: () => ([
			autoprefixer({ browsers }),
		]),
	},
} ]

const extractCssPlugin = new MiniCssExtractPlugin({
	filename: '[name].[chunkhash].css',
})

const addStyleLoader = (isProduction, loaders) => (
	[ isProduction ? MiniCssExtractPlugin.loader : 'style-loader' ].concat(loaders)
)

module.exports = (env, args) => ({
	resolveLoader: {
		modules: [
			path.resolve(__dirname, 'loaders'),
			'node_modules',
		],
	},
	module: {
		rules: [ {
			test: /\.css$/,
			include: [ 'node_modules', projectPaths.source ],
			use: addStyleLoader(env.production, cssLoaders),
		} ],
	},
	plugins: env.production ? [ extractCssPlugin ] : [],
})
