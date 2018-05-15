import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import { routerReducer, routerMiddleware as createRouterMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'

import appReducer from './state'
import appSaga from './sagas'


export const history = createHistory()

const sagaMiddleware = createSagaMiddleware()
const routerMiddleware = createRouterMiddleware(history)
const middlewares = [ routerMiddleware, sagaMiddleware, logger ]

export default (initialState = {}) => {
	const store = createStore(appReducer, initialState, applyMiddleware(...middlewares))
	return {
		...store,
		runSaga: () => sagaMiddleware.run(appSaga),
	}
}
