import { createSelector } from 'reselect'
import {
	getUsers,
	getPagesCount,
	getCurrentPage,
	getPages,
	byCurrentTerm,
} from 'store/state/domainData/selectors'
import { querySelector } from 'store/state/router/selectors'
import { getUsersSearchHref } from 'utils/router'


export const userNameListSelector = createSelector(
	byCurrentTerm(getPages),
	byCurrentTerm(getCurrentPage),
	(pages, currentPage) => (
		pages[currentPage] || []
	)
)

export const propsPaginatorSelector = createSelector(
	byCurrentTerm(getPagesCount),
	byCurrentTerm(getCurrentPage),
	querySelector,
	(pagesCount, currentPage, query) => ({
		pagesCount,
		currentPage: parseInt(currentPage, 10),
		getLink: (pageNum, base) => getUsersSearchHref(query.q, pageNum, base),
	})
)
