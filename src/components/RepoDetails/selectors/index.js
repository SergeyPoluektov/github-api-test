import { createSelector } from 'reselect'
import { getRepos } from 'store/state/domainData/selectors'


export const repoDetailsSelector = createSelector(
	getRepos,
	(_, fullName) => fullName,
	(repos, fullName) => {
		const repo = repos[fullName] || {}
		const owner = repo.owner || {}
		return {
			ownerAva: owner.avatar_url,
			ownerLogin: owner.login,
			fullName,
			url: repo.html_url,
			description: repo.description,
		}
	}
)
