import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import domainDataReducer from './domainData/reducer'


export default combineReducers({
	domainData: domainDataReducer,
	router: routerReducer,
})
