import { isEmpty } from 'lodash'
import createRouterProxy from 'react-cosmos-router-proxy'
import createReduxProxy from 'react-cosmos-redux-proxy'
import configureStore from 'store'

const ReduxProxy = createReduxProxy({
	createStore: (state) => {
		const store = configureStore(isEmpty(state) ? undefined : state)
		store.runSaga()
		return store
	},
})

export default [
	createRouterProxy(),
	ReduxProxy,
]
