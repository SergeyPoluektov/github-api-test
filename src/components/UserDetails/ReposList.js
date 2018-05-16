import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import { getRepoDetailsHref, getUserDetailsHref } from 'utils/router'

import Paginator from 'components/Paginator'
import RepoCard from './RepoCard.js'

import styles from './styles/index.css'
import { propsPaginatorSelector } from './selectors'


const toRepoCard = (name) => (
	<li key={name}>
		<Link to={getRepoDetailsHref(name)}>
			<RepoCard name={name}/>
		</Link>
	</li>
)

const orderedSortList = [
	{ sort: 'created', direction: 'desc', name: 'from newest created' },
	{ sort: 'created', direction: 'asc', name: 'from oldest created' },
	{ sort: 'updated', direction: 'desc', name: 'from newest updated' },
	{ sort: 'updated', direction: 'asc', name: 'from oldest updated' },
]

const makeSortLink = (userName, propsPaginator, basePage = 1) => (props) => {
	const { currentPage: page, sort: currentSort, direction: currentDir } = propsPaginator
	const { sort, direction, name } = props
	const propsLink = {
		key: name,
		to: getUserDetailsHref(userName, page, basePage, sort, direction),
		className: classnames({
			[styles.sortLink]: true,
			[styles.activeSortLink]: currentSort === sort && currentDir === direction,
		}),
	}
	return (<Link {...propsLink}>{name}</Link>)
}

const ReposList = ({ repos, propsPaginator, userName }) => (
	<Paginator {...propsPaginator}>
		<div className={styles.sort}>
			<span className={styles.sortTitle}>sort by</span>
			<div className={styles.sortLinkList}>
				{orderedSortList.map(makeSortLink(userName, propsPaginator))}
			</div>
		</div>
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
