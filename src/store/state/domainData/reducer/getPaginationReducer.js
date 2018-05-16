const initialState = {
	fetchStatus: 'NONE',
	pages: {},
	pagesCount: 1,
	currentPage: 1,
}

export const makeListNormalizer = (key) => (prevList) => (acc, item) => ({
	...acc,
	[item[key]]: {
		...prevList[item[key]],
		...item,
	},
})

const getReducer = (idKey, actionTypes) => {
	const {
		fetchActionType,
		fetchResolveActionType,
	} = actionTypes
	return function (state = initialState, action) {
		switch (action.type) {
			case fetchActionType: {
				return { ...state, fetchStatus: 'LOADING' }
			}
			case fetchResolveActionType: {
				if (action.isError) return { ...state, fetchStatus: 'FAILED' }
				const { entities = [], pagesCount = state.pagesCount, page } = action.payload
				const entityIds = entities.map((entity) => entity[idKey])
				const pages = state.pages || {}
				return {
					...state,
					fetchStatus: 'SUCCESS',
					pagesCount,
					currentPage: page,
					pages: {
						...pages,
						[page]: [
							...(pages[page] || []),
							...entityIds,
						]
					},
				}
			}
			default: return state
		}
	}
}

export default getReducer
