import { range } from 'lodash'
import { Link } from 'react-router-dom'
import classnames from 'classnames'

import styles from './styles/index.css'


const BASE_PAGE = 1
const makePageNumberCompMapper = (currentPage, getLink) => (pageNum) => {
	const propsLink = {
		key: pageNum,
		to: getLink(pageNum, BASE_PAGE),
		className: classnames({
			[styles.pageNum]: true,
			[styles.pageNumActive]: currentPage === pageNum,
		})
	}
	return (
		<Link {...propsLink}>
			{pageNum}
		</Link>
	)
}
const Paginator = ({ children, pagesCount, currentPage, getLink }) => {
	const pageNumbers = range(BASE_PAGE, pagesCount + BASE_PAGE)
	const shouldRenderPageNums = pageNumbers.length > 1
	const toPageNumComp = makePageNumberCompMapper(currentPage, getLink)
	return (
		<div className={styles.paginator}>
			{children}
			{shouldRenderPageNums && (
				<div className={styles.pages}>
					{pageNumbers.map(toPageNumComp)}
				</div>
			)}
		</div>
	)
}

export default Paginator
