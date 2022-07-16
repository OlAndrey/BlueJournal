import React, { useState } from "react";

const Pagination = ({totalItemCount, currentPage, pageSize, portionSize, onPageChanged}) => {
    const pages = [];
    const pagesCount = Math.ceil(totalItemCount / pageSize);
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;
    
    return (
        <nav class="d-flex justify-content-center" >
            <ul class="pagination">
            {
                portionNumber > 1 && 
                <li class="page-item">
                    <span class="page-link" onClick={() => setPortionNumber(portionNumber - 1)}>
                        <span aria-hidden="true">&laquo;</span>
                        <span class="sr-only">Previous</span>
                    </span>
                </li>
            }
            {
                pages
                    .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                    .map(p => {
                        if(p === currentPage)
                            return <li class="page-item active"><span class="page-link">{p}</span></li>
                        else
                            return <li class="page-item"><span class="page-link" onClick={() => onPageChanged(p)}>{p}</span></li>
                    })
            }
            {
                portionCount > portionNumber &&
                <li class="page-item">
                    <span class="page-link" onClick={() => setPortionNumber(portionNumber + 1)}>
                        <span class="sr-only">Next</span>
                        <span aria-hidden="true">&raquo;</span>
                    </span>
                </li>
            }
            </ul>
        </nav>
    )
}

export default Pagination;