import { connect } from 'react-redux'
import { getRepos } from 'store/state/domainData/selectors'


const RepoCard = ({ name }) => (
	<span>{name}</span>
)

const mapStateToProps = (state, { name }) => {
	const repos = getRepos(state)
	return repos[name]
}
const connector = connect(mapStateToProps)

export default connector(RepoCard)
