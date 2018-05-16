import qs from 'qs'
import request from 'superagent'


const token = GITHUB_TOKEN
const api = 'https://api.github.com'

const withAuthorization = (req) => (
	token
	? req.set({
		Authorization: `token ${token}`,
	})
	: req
)

export const getUser = (userName) => withAuthorization(
	request
		.get(`${api}/users/${userName}`)
)

export const searchUser = (term, page) => withAuthorization(
	request
		.get(`${api}/search/users?${qs.stringify({ q: term, page })}`)
)

export const getUserStarredRepos = (userName, page, sort, direction) => withAuthorization(
	request
		.get(`${api}/users/${userName}/starred?${qs.stringify({ page, sort, direction })}`)
)

export const getRepo = (repoName) => withAuthorization(
	request
		.get(`${api}/repos/${repoName}`)
)
