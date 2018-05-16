import {
	SEARCH_USER,
	SEARCH_USER_RESOLVE,
	LOAD_USER_INFO_RESOLVE,
	LOAD_STARRED_REPOS,
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
	fetchActionType: LOAD_STARRED_REPOS,
	fetchResolveActionType: LOAD_STARRED_REPOS_RESOLVE,
})
const usersListNormalizer = makeListNormalizer('login')

const initialState = {
	entities: {},
	pagination: {},
	currentTerm: '',
}

export default function reducer (state = initialState, action) {
	switch (action.type) {
		case SEARCH_USER: {
			const { term } = action.payload
			return {
				...state,
				pagination: {
					...state.pagination,
					[term]: paginationReducer(state.pagination[term], action),
				},
				currentTerm: term,
			}
		}
		case SEARCH_USER_RESOLVE: {
			if (action.isError) return state
			const { entities = [], term } = action.payload
			const newEntities = entities.reduce(usersListNormalizer(state.entities), {})
			return {
				...state,
				entities: {
					...state.entities,
					...newEntities,
				},
				pagination: {
					...state.pagination,
					[term]: paginationReducer(state.pagination[term], action)
				},
				currentTerm: term,
			}
		}
		case LOAD_USER_INFO_RESOLVE: {
			if (action.isError) return state
			const { payload: newUserData } = action
			const userData = state.entities[newUserData.login] || {}
			return {
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
		case LOAD_STARRED_REPOS: {
			const { sort, direction, userName } = action.payload
			const user = state.entities[userName] || {}
			const repos = user.starredRepos || {}
			const isSameSorting = sort === repos.sort
				&& direction === repos.direction
			if (isSameSorting) return state
			return {
				...state,
				entities: {
					...state.entities,
					[userName]: {
						...user,
						starredRepos: {
							...starredReposReducer(undefined, action),
							sort,
							direction,
						},
					},
				},
			}
		}
		case LOAD_STARRED_REPOS_RESOLVE: {
			if (action.isError) return state
			const { userName, sort, direction } = action.payload
			const user = state.entities[userName] || {}
			const starredReposState = user.starredRepos
			return {
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
		default: return state
	}
}
