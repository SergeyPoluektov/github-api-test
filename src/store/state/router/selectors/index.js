import { createSelector } from 'reselect'
import qs from 'qs'


export const getRouter = (state) => (state.router)
export const querySelector = createSelector(
	getRouter,
	({ location }) => qs.parse(location.search.slice(1))
)
