import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import RootComponent from './components/PageContainer'
import createStore from './store'


const store = createStore()
store.runSaga()
const App = () => (
	<Provider store={store}>
		<RootComponent/>
	</Provider>
)

const rootElement = document.getElementById('root')

ReactDOM.render(<App/>, rootElement)
