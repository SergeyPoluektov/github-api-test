import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getRepoDetailsHref } from 'utils/router'

import RepoCard from './RepoCard.js'
import Paginator from 'components/Paginator'

import { propsPaginatorSelector } from './selectors'


const toRepoCard = (name) => (
	<li key={name}>
		<Link to={getRepoDetailsHref(name)}>
			<RepoCard name={name}/>
		</Link>
	</li>
)

const ReposList = ({ repos, propsPaginator }) => (
	<Paginator {...propsPaginator}>
		<ul>
			{repos.map(toRepoCard)}
		</ul>
	</Paginator>
)

const mapStateToProps = (state, { userName }) => ({
	propsPaginator: propsPaginatorSelector(state, userName),
})
const connector = connect(mapStateToProps)

export default connector(ReposList)
