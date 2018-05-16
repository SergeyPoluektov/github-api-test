import parseLinkHeader from 'parse-link-header'
import { call, takeEvery, put } from 'redux-saga/effects'
import { searchUser } from 'utils/api'
import { SEARCH_USER } from 'store/state/types'
import { searchUserResolve } from 'store/state/domainData/actions'


function* searchUserWatcher ({ payload }) {
	try {
		const { term, page } = payload
		const response = yield call(searchUser, term, page)
		const users = response.body.items
		const linkHeader = response.header['link']
		const parsed = parseLinkHeader(linkHeader)
		const hasLast = parsed && parsed.last
		const pagesCount = parseInt(hasLast ? parsed.last.page : page, 10)
		yield put(searchUserResolve({ entities: users, pagesCount, page, term }))
	}
	catch (e) {
		console.log('Cannt find users', e)
		const isError = true
		yield put(searchUserResolve(null, isError))
	}
}

export default function* () {
	yield takeEvery(SEARCH_USER, searchUserWatcher)
}
