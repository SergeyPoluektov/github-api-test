import { connect } from 'react-redux'
import { getUsers } from 'store/state/domainData/selectors'

import styles from './styles/index.css'


export const UserCard = ({ imageSrc, title }) => (
	<div className={styles.user}>
		<div className={styles.imageContainer}>
			<img className={styles.image} src={imageSrc} alt={title}/>
		</div>
		<div className={styles.titleContainer}>
			<span className={styles.title}>{title}</span>
		</div>
	</div>
)

const mapStateToProps = (state, { userName }) => {
	const users = getUsers(state)
	const {
		avatar_url: imageSrc,
		login: title,
	} = users[userName]
	return {
		imageSrc,
		title,
	}
}
const connector = connect(mapStateToProps)

export default connector(UserCard)
