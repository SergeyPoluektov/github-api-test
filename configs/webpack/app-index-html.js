const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const projectPaths = require('../path.js')


const prodTemplatePath = path.join(projectPaths.templates, 'dev.ejs')
const devTemplatePath = path.join(projectPaths.templates, 'dev.ejs')

module.exports = (env = {}, args) => ({
	plugins: [
		new HtmlPlugin({
			template: env.production ? prodTemplatePath : devTemplatePath,
			inject: true,
		}),
	],
})
