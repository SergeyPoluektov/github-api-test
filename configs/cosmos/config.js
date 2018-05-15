const path = require('path')
const projectPaths = require('../path.js')


module.exports = {
	rootPath: projectPaths.projectBase,
	publicPath: 'build',
	proxiesPath: './configs/cosmos/proxies.js',
	webpackConfigPath: './configs/cosmos/webpack.config.js',
}
