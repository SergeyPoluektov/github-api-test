import { flow } from 'lodash'
import { createSelector } from 'reselect'
import {
	getDomainData,
	makeEntitiesSelector,
	makeFetchStatusSelector,
	makePagesSelector,
	makePagesCountSelector,
	makeCurrentPageSelector,
} from './common'


const getUsersState = flow(
	getDomainData,
	({ users }) => users,
)
const userPaginationState = createSelector(
	getUsersState,
	(_, term) => term,
	({ pagination }, term) => (pagination[term] || {})
)
export const getUsers = makeEntitiesSelector(getUsersState)
export const getFetchUsersStatus = makeFetchStatusSelector(userPaginationState)
export const getPagesCount = makePagesCountSelector(userPaginationState)
export const getCurrentPage = makeCurrentPageSelector(userPaginationState)
export const getPages = makePagesSelector(userPaginationState)
export const byCurrentTerm = (selector) => (state) => {
	const { currentTerm } = getUsersState(state)
	return selector(state, currentTerm)
}
