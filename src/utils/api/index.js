import qs from 'qs'
import request from 'superagent'


const token = 'de571a06906aa8436a082c6b69aa98799ec555ed'
const api = 'https://api.github.com'

const withAuthorization = (req) => (
	req.set({
		Authorization: `token ${token}`,
	})
)

export const getUser = (userName) => withAuthorization(
	request
		.get(`${api}/users/${userName}`)
)

export const searchUser = (term, page) => withAuthorization(
	request
		.get(`${api}/search/users?${qs.stringify({ q: term, page })}`)
)

export const getUserStarredRepos = (userName, page) => withAuthorization(
	request
		.get(`${api}/users/${userName}/starred?${qs.stringify({ page })}`)
)

export const getRepo = (repoName) => withAuthorization(
	request
		.get(`${api}/repos/${repoName}`)
)
