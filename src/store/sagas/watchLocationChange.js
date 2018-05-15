import qs from 'qs'
import { takeEvery, call, fork, put, select } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import { matchPath } from 'react-router-dom'
import { PATHS } from 'utils/router'
import {
	searchUser,
	searchUserResolve,
	loadUserInfo,
	loadStarredRepos,
	loadStarredReposResolve,
	loadRepoInfo,
} from 'store/state/domainData/actions'
import { getUsers, getRepos, getPages } from 'store/state/domainData/selectors'


function* usersPageWorker ({ q: term, page = '1' }) {
	const pages = yield select(getPages)
	const users = pages[page] || []
	if (users.length > 0) yield put(searchUserResolve({ page }))
	else yield put(searchUser(term, page))
}

const hasUserStarredRepos = ({ starredRepos = {} }, page) => {
	const { pages = {} } = starredRepos
	const userStarredReposList = pages[page] || []
	return userStarredReposList.length > 0
}

function* userDetailsWorker ({ userName }, { page = '1' }) {
	const users = yield select(getUsers)
	const user = users[userName] || {}
	// don't load user info if already have location in state
	if (user.location) {
		const hasRepos = yield call(hasUserStarredRepos, user, page)
		if (hasRepos) {
			yield put(loadStarredReposResolve({ userName, page }))
		}
		else {
			yield put(loadStarredRepos(userName, page))
		}
		return
	}

	yield put(loadUserInfo(userName, page))
}

function* repoDetailsWorker ({ orgName, repoName }) {
	const fullRepoName = [ orgName, repoName ].join('/')
	const repos = yield select(getRepos)
	// don't load repo info if already have network_count in state
	if (repos[fullRepoName] && repos[fullRepoName]['network_count']) return

	yield put(loadRepoInfo(fullRepoName))
}

export default function* locationChangeWatcher ({ payload }) {
	const { pathname, search } = payload
	const query = qs.parse(search.slice(1))
	const usersMatched = yield call(matchPath, pathname, PATHS.USERS)
	const userDetailsMatched = yield call(matchPath, pathname, PATHS.USER_DETAILS)
	const repoDetailsMatched = yield call(matchPath, pathname, PATHS.REPO_DETAILS)
	if (usersMatched && usersMatched.isExact) {
		// has no query terms
		if (!query.q) {
			yield put(push('/'))
			return
		}
		yield fork(usersPageWorker, query)
	}
	if (userDetailsMatched) yield fork(userDetailsWorker, userDetailsMatched.params, query)
	if (repoDetailsMatched) yield fork(repoDetailsWorker, repoDetailsMatched.params)
}
