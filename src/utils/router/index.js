import qs from 'qs'


export const PATHS = Object.freeze({
	INDEX: '/',
	USERS: '/users',
	USER_DETAILS: '/users/:userName',
	REPO_DETAILS: '/repos/:orgName/:repoName',
})

export const getRepoDetailsHref = (fullRepoName) => {
	const [ orgName, repoName ] = fullRepoName.split('/')
	return PATHS.REPO_DETAILS
		.replace(':orgName', orgName)
		.replace(':repoName', repoName)
}
export const getUserDetailsHref = (userName, ...queryArgs) => {
	const [
		page = 1,
		base = 1,
		sort = 'created',
		direction = 'desc',
	] = queryArgs
	const isDefaultQueryArgs = page === base && sort === 'created' && direction === 'desc'
	const queryString = isDefaultQueryArgs ? '' : `?${qs.stringify({ page, sort, direction })}`
	return `${PATHS.USER_DETAILS.replace(':userName', userName)}${queryString}`
}
export const getUsersSearchHref = (term, pageNum, base = 1) => {
	const queryString = qs.stringify({
		q: term,
		page: pageNum === base ? undefined : pageNum,
	})
	return `${PATHS.USERS}?${queryString}`
}
