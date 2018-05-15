import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import { repoDetailsSelector } from './selectors'
import styles from './styles/index.css'


const RepoDetails = ({ ownerAva, ownerLogin, fullName, url, description }) => (
	<div className={styles.repoDetails}>
		<div className={styles.ownerInfo}>
			<div className={styles.imageContainer}>
				<img className={styles.image} src={ownerAva} alt={ownerLogin}/>
			</div>
			<div className={styles.titleContainer}>
				<span className={styles.title}>{ownerLogin}</span>
			</div>
		</div>
		<a className={styles.repoName} href={url}>{fullName}</a>
		<span className={styles.descr}>{description}</span>
	</div>
)

const mapStateToProps = (state, { match }) => {
	const { orgName, repoName } = match.params
	return repoDetailsSelector(state, `${orgName}/${repoName}`)
}
const connector = connect(mapStateToProps)

export default withRouter(connector(RepoDetails))
