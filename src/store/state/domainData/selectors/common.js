import { flow } from 'lodash'


export const getDomainData = (state) => (state.domainData)

const createPropGetterMaker = (propName, defaultValue) => (getState) => flow(
	getState,
	(state) => (state[propName] || defaultValue)
)
export const makeEntitiesSelector = createPropGetterMaker('entities')
export const makeFetchStatusSelector = createPropGetterMaker('fetchStatus')
export const makePagesSelector = createPropGetterMaker('pages', {})
export const makePagesCountSelector = createPropGetterMaker('pagesCount')
export const makeCurrentPageSelector = createPropGetterMaker('currentPage')
