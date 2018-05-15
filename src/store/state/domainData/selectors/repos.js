import { flow } from 'lodash'
import { getDomainData } from './common'


export const getRepos = flow(
	getDomainData,
	({ repos }) => repos.entities
)
