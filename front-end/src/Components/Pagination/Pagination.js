import React, { useState } from 'react'

const Pagination = ({
  totalItemCount,
  currentPage,
  pageSize,
  portionSize,
  onPageChanged
}) => {
  const pages = []
  const pagesCount = Math.ceil(totalItemCount / pageSize)
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i)
  }

  let portionCount = Math.ceil(pagesCount / portionSize)
  let [portionNumber, setPortionNumber] = useState(1)
  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
  let rightPortionPageNumber = portionNumber * portionSize

  return (
    <nav className="d-flex justify-content-center">
      <ul className="pagination">
        {portionNumber > 1 && (
          <li className="page-item">
            <span
              className="page-link"
              onClick={() => setPortionNumber(portionNumber - 1)}
            >
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">Previous</span>
            </span>
          </li>
        )}
        {pages
          .filter(
            (p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber
          )
          .map((p) => {
            if (p === currentPage)
              return (
                <li key={p} className="page-item active">
                  <span className="page-link">{p}</span>
                </li>
              )
            else
              return (
                <li key={p} className="page-item">
                  <span className="page-link" onClick={() => onPageChanged(p)}>
                    {p}
                  </span>
                </li>
              )
          })}
        {portionCount > portionNumber && (
          <li className="page-item">
            <span
              className="page-link"
              onClick={() => setPortionNumber(portionNumber + 1)}
            >
              <span className="sr-only">Next</span>
              <span aria-hidden="true">&raquo;</span>
            </span>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Pagination
