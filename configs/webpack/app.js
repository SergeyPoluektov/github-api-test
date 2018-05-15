const merge = require('webpack-merge')
const basicConfig = require('./app-basic.js')
const jsConfig = require('./app-js.js')
const devtoolConfig = require('./app-devtool.js')
const htmlConfig = require('./app-index-html.js')
const cssConfig = require('./app-css.js')


module.exports = (env = {}, args) => merge([
	basicConfig(env, args),
	jsConfig(env, args),
	devtoolConfig(env, args),
	htmlConfig(env, args),
	cssConfig(env, args),
])

