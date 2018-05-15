import {
	LOAD_USER_INFO,
	LOAD_USER_INFO_RESOLVE,
	SEARCH_USER,
	SEARCH_USER_RESOLVE,
} from 'store/state/types'


export const loadUserInfo = (userName, page) => ({
	type: LOAD_USER_INFO,
	payload: {
		userName,
		page,
	}
})
export const loadUserInfoResolve = (userData, isError = false) => ({
	type: LOAD_USER_INFO_RESOLVE,
	payload: userData,
	isError,
})

export const searchUser = (term, page) => ({
	type: SEARCH_USER,
	payload: {
		term,
		page,
	},
})
export const searchUserResolve = (searchData, isError = false) => ({
	type: SEARCH_USER_RESOLVE,
	payload: searchData,
	isError,
})

