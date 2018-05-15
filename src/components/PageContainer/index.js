import { Switch, Route, Link } from 'react-router-dom'
import { ConnectedRouter as Router } from 'react-router-redux'
import { history } from 'store'
import { PATHS } from 'utils/router'

import UserSearch from 'components/UserSearch'
import UserList from 'components/UserList'
import UserDetails from 'components/UserDetails'
import RepoDetails from 'components/RepoDetails'

import styles from './styles/index.css'


const PagesContainer = () => (
	<Router history={history}>
		<div className={styles.page}>
			<div className={styles.header}>
				<Link to={PATHS.INDEX}>
					<span className={styles.navLink}>Home</span>
				</Link>
			</div>
			<div className={styles.body}>
				<Switch>
					<Route exact path={PATHS.INDEX} component={UserSearch}/>
					<Route exact path={PATHS.USERS} component={UserList}/>
					<Route exact path={PATHS.USER_DETAILS} component={UserDetails}/>
					<Route exact path={PATHS.REPO_DETAILS} component={RepoDetails}/>
				</Switch>
			</div>
		</div>
	</Router>
)

export default PagesContainer
