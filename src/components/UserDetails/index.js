import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import ReposList from './ReposList.js'

import { userInfoSelector, propsPaginatorSelector } from './selectors'
import styles from './styles/index.css'


const UserInfo = (props) => {
	const {
		imageSrc,
		name,
		login,
		email,
		userLocation,
		starredRepos,
		isLoaded,
	} = props
	const repos = isLoaded && starredRepos.length > 0
		? <ReposList repos={starredRepos} userName={login}/>
		: <span className={styles.noReposTxt}>No starred repositories</span>
	const loader = <span className={styles.noReposTxt}>Loading starred repositories</span>
	return (
		<div className={styles.userInfo}>
			<div className={styles.user}>
				<div className={styles.imageContainer}>
					<img className={styles.image} src={imageSrc} alt={login}/>
				</div>
				<div className={styles.infoContainer}>
					<span className={styles.name}>{name}</span>
					<span className={styles.login}>{login}</span>
					<span className={styles.login}>{userLocation}</span>
					<a className={styles.email} href={`mailto:${email}`}>{email}</a>
				</div>
			</div>
			<div>
				{isLoaded ? repos : loader}
			</div>
		</div>
	)
}

const mapStateToProps = (state, { match }) => {
	const { userName } = match.params
	return userInfoSelector(state, userName)
}
const connector = connect(mapStateToProps)

export default withRouter(connector(UserInfo))
