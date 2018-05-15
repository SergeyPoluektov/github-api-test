import { flow } from 'lodash'
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
const getUsersPaginationState = flow(
	getUsersState,
	({ pagination }) => pagination
)
export const getUsers = makeEntitiesSelector(getUsersState)
export const getFetchUsersStatus = makeFetchStatusSelector(getUsersPaginationState)
export const getPagesCount = makePagesCountSelector(getUsersPaginationState)
export const getCurrentPage = makeCurrentPageSelector(getUsersPaginationState)
export const getPages = makePagesSelector(getUsersPaginationState)
