const path = require('path')


const projectBase = path.join(__dirname, '..')
const build = path.join(projectBase, 'build')

module.exports = {
	projectBase,
	build,
	dll: path.join(build, 'lib'),
	source: path.join(projectBase, 'src'),
	templates: path.join(projectBase, 'configs/templates'),
}
