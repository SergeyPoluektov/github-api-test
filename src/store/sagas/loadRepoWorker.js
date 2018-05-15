import parseLinkHeader from 'parse-link-header'
import { all, call, takeEvery, put } from 'redux-saga/effects'
import { getRepo, getUserStarredRepos } from 'utils/api'
import { LOAD_REPO_INFO, LOAD_STARRED_REPOS } from 'store/state/types'
import { loadRepoInfoResolve, loadStarredReposResolve } from 'store/state/domainData/actions'


function* loadStarredReposWatcher ({ payload }) {
	try {
		const { userName, page } = payload
		const response = yield call(getUserStarredRepos, userName, page)
		const linkHeader = response.header['link']
		const parsed = parseLinkHeader(linkHeader)
		const hasLast = parsed && parsed.last
		const pagesCount = parseInt(hasLast ? parsed.last.page : page, 10)
		yield put(loadStarredReposResolve({
			entities: response.body,
			userName,
			pagesCount,
			page,
		}))
	}
	catch (e) {
		console.log('Cannt get starred repos data', e)
		const isError = true
		yield put(loadStarredReposResolve(null, isError))
	}
}

function* loadRepoInfoWatcher ({ payload: repoName }) {
	try {
		const response = yield call(getRepo, repoName)
		const repoInfo = response.body
		yield put(loadRepoInfoResolve(repoInfo))
	}
	catch (e) {
		console.log('Cannt get repo data', e)
		const isError = true
		yield put(loadRepoInfoResolve(null, isError))
	}
}

export default function* () {
	yield all([
		takeEvery(LOAD_REPO_INFO, loadRepoInfoWatcher),
		takeEvery(LOAD_STARRED_REPOS, loadStarredReposWatcher),
	])
}
