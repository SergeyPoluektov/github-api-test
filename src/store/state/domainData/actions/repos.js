import {
	LOAD_STARRED_REPOS,
	LOAD_STARRED_REPOS_RESOLVE,
	LOAD_REPO_INFO,
	LOAD_REPO_INFO_RESOLVE,
} from 'store/state/types'


export const loadStarredRepos = (payload) => ({
	type: LOAD_STARRED_REPOS,
	payload,
})
export const loadStarredReposResolve = (payload, isError = false) => ({
	type: LOAD_STARRED_REPOS_RESOLVE,
	payload,
	isError,
})

export const loadRepoInfo = (repoName) => ({
	type: LOAD_REPO_INFO,
	payload: repoName,
})
export const loadRepoInfoResolve = (repoInfo, isError = false) => ({
	type: LOAD_REPO_INFO_RESOLVE,
	payload: repoInfo,
	isError,
})


