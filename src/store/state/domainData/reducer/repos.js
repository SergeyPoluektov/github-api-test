import {
	LOAD_REPO_INFO_RESOLVE,
	LOAD_STARRED_REPOS_RESOLVE,
} from 'store/state/types'

import { makeListNormalizer } from './getPaginationReducer.js'


const usersListNormalizer = makeListNormalizer('full_name')

const initialState = {
	entities: {},
}

export default function reducer (state = initialState, action) {
	switch (action.type) {
		case LOAD_STARRED_REPOS_RESOLVE: {
			if (action.isError) return state
			const { entities = [] } = action.payload
			const newEntities = entities.reduce(usersListNormalizer(state.entities), {})
			return {
				...state,
				entities: {
					...state.entities,
					...newEntities,
				}
			}
		}
		case LOAD_REPO_INFO_RESOLVE: {
			if (action.isError) return state
			const { payload: newRepoInfo } = action
			const repoInfo = state.entities[newRepoInfo.full_name] || {}
			return {
				...state,
				entities: {
					...state.entities,
					[newRepoInfo.full_name]: {
						...repoInfo,
						...newRepoInfo,
					},
				},
			}
		}
		default: {
			return state
		}
	}
}
