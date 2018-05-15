module.exports = (env = {}, args) => ({
	module: {
		rules: [ {
			test: /\.js$/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: [ 'env', 'react' ],
					plugins: [
						'lodash',
						'transform-class-properties',
						'transform-object-rest-spread',
						'syntax-dynamic-import',
						'react-require',
						[ 'transform-runtime', {
							helpers: false,
							polyfill: false,
							regenerator: true,
							moduleName: 'babel-runtime',
						} ],
					],
				},
			},
		} ],
	},
})
