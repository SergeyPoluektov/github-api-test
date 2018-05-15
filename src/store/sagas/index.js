import { fork, all, takeEvery } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'

import locationChangeWatcher from './watchLocationChange.js'
import loadUserInfoWorker from './loadUserWorker.js'
import searchUserWorker from './userSearchWorker.js'
import loadRepoInfoWorker from './loadRepoWorker.js'


export default function* () {
	yield all([
		fork(loadUserInfoWorker),
		fork(searchUserWorker),
		fork(loadRepoInfoWorker),
		takeEvery(LOCATION_CHANGE, locationChangeWatcher),
	])
}
