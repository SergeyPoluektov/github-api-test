import { Link } from 'react-router-dom'
import { getUsersSearchHref } from 'utils/router'

import styles from './styles/index.css'


class UserSearch extends React.Component {
	state = { searchTerm: '' }
	_onSearchTermChange = ({ target }) => this.setState({
		searchTerm: target.value,
	})

	render () {
		const { searchTerm } = this.state
		const propsSearchInput = {
			className: styles.searchInput,
			value: searchTerm,
			onChange: this._onSearchTermChange,
		}
		const searchInput = (<input {...propsSearchInput}/>)

		const propsSearchBtn = {
			to: getUsersSearchHref(searchTerm),
		}
		const searchBtn = (
			<Link {...propsSearchBtn}>
				<button className={styles.searchBtn}>Search user</button>
			</Link>
		)

		return (
			<div className={styles.searchContainer}>
				<h2 className={styles.title}>Type a username</h2>
				<div>
					{searchInput}
					{searchBtn}
				</div>
			</div>
		)
	}
}

export default UserSearch
