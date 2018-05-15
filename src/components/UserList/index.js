import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUserDetailsHref } from 'utils/router'

import UserCard from 'components/UserCard'
import Paginator from 'components/Paginator'

import { userNameListSelector, propsPaginatorSelector } from './selectors'
import styles from './styles/index.css'


const toUserCard = (userName) => (
	<Link key={userName} className={styles.userCardWrapper} to={getUserDetailsHref(userName)}>
		<UserCard userName={userName}/>
	</Link>
)

const UserList = ({ userNameList, propsPaginator }) => (
	<Paginator {...propsPaginator}>
		<div className={styles.userList}>
			{userNameList.map(toUserCard)}
		</div>
	</Paginator>
)

const mapStateToProps = (state) => ({
	userNameList: userNameListSelector(state),
	propsPaginator: propsPaginatorSelector(state),
})
const connector = connect(mapStateToProps)

export default connector(UserList)
