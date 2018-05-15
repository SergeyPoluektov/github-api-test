import { combineReducers } from 'redux'
import users from './users'
import repos from './repos'


export default combineReducers({
	users,
	repos,
})
