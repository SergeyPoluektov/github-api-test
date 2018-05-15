import {
	SEARCH_USER,
	SEARCH_USER_RESOLVE,
	LOAD_USER_INFO,
	LOAD_USER_INFO_RESOLVE,
	LOAD_STARRED_REPOS_RESOLVE,
} from 'store/state/types'

import getPaginationReducer, {
	makeListNormalizer,
} from './getPaginationReducer.js'


const paginationReducer = getPaginationReducer('login', {
	fetchActionType: SEARCH_USER,
	fetchResolveActionType: SEARCH_USER_RESOLVE,
})
const starredReposReducer = getPaginationReducer('full_name', {
	fetchActionType: LOAD_USER_INFO,
	fetchResolveActionType: LOAD_STARRED_REPOS_RESOLVE,
})
const usersListNormalizer = makeListNormalizer('login')

const initialState = {
	entities: {},
	pagination: paginationReducer(undefined, {}),
}

export default function reducer (state = initialState, action) {
	let nextState = state
	switch (action.type) {
		case SEARCH_USER_RESOLVE: {
			if (action.isError) {
				nextState = state
			}
			else {
				const { entities } = action.payload
				const newEntities = entities.reduce(usersListNormalizer(state.entities), {})
				nextState = {
					...state,
					entities: {
						...state.entities,
						...newEntities,
					}
				}
			}
			break
		}
		case LOAD_USER_INFO_RESOLVE: {
			if (action.isError) nextState = state
			else {
				const { payload: newUserData } = action
				const userData = state.entities[newUserData.login] || {}
				nextState = {
					...state,
					entities: {
						...state.entities,
						[newUserData.login]: {
							...userData,
							...newUserData,
						},
					}
				}
			}
			break
		}
		case LOAD_STARRED_REPOS_RESOLVE: {
			if (action.isError) nextState = state
			else {
				const { userName } = action.payload
				const user = state.entities[userName] || {}
				const starredReposState = user.starredRepos
				nextState = {
					...state,
					entities: {
						...state.entities,
						[userName]: {
							...user,
							starredRepos: starredReposReducer(starredReposState, action),
						},
					},
				}
			}
			break
		}
		default: {
			return state
		}
	}
	return {
		...nextState,
		pagination: paginationReducer(state.pagination, action),
	}
}
