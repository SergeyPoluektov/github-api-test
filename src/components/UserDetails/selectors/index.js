import { createSelector } from 'reselect'
import { getUsers } from 'store/state/domainData/selectors'
import { getUserDetailsHref } from 'utils/router'


export const userInfoSelector = createSelector(
	getUsers,
	(_, userName) => userName,
	(users, userName) => {
		const user = users[userName] || {}
		const { currentPage, pages = {} } = (user.starredRepos || {})
		return {
			imageSrc: user.avatar_url,
			name: user.name,
			login: user.login,
			email: user.email,
			userLocation: user.location,
			starredRepos: pages[currentPage] || [],
		}
	}
)

export const propsPaginatorSelector = createSelector(
	getUsers,
	(_, userName) => userName,
	(users, userName) => {
		const { starredRepos = {} } = users[userName] || {}
		return {
			pagesCount: starredRepos.pagesCount,
			currentPage: parseInt(starredRepos.currentPage, 10),
			getLink: (pageNum, base) => getUserDetailsHref(userName, pageNum, base),
		}
	}
)
