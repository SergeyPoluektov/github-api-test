import { call, takeEvery, put } from 'redux-saga/effects'
import { getUser } from 'utils/api'
import { LOAD_USER_INFO } from 'store/state/types'
import { loadUserInfoResolve, loadStarredRepos } from 'store/state/domainData/actions'


function* loadUserInfoWatcher ({ payload }) {
	try {
		const { userName, page } = payload
		const response = yield call(getUser, userName)
		const userInfo = response.body
		yield put(loadUserInfoResolve(userInfo))

		yield put(loadStarredRepos(userName, page))
	}
	catch (e) {
		console.log('Cannt get user data', e)
		const isError = true
		yield put(loadUserInfoResolve(null, isError))
	}
}

export default function* () {
	yield takeEvery(LOAD_USER_INFO, loadUserInfoWatcher)
}
