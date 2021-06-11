import React from 'react'
import {
  RiArrowRightSFill as ArrowRight,
  RiArrowLeftSFill as ArrowLeft
} from 'react-icons/ri'
import styled from 'styled-components'

const Pagination = ({
  previousPage,
  nextPage,
  canPreviousPage,
  canNextPage,
  pageOptions,
  pageIndex,
  gotoPage
}) => {
  return (
    <PaginationStyled>
      <button
        className='navButton arrow'
        onClick={() => previousPage()}
        disabled={!canPreviousPage}
      >
        <ArrowLeft />
      </button>

      {pageOptions.map((page) => (
        <button
          key={page}
          className={pageIndex === page ? 'actual' : 'navButton'}
          onClick={() => gotoPage(page)}
          disabled={pageIndex === page}
        >
          {page + 1}
        </button>
      ))}

      <button
        className='navButton arrow'
        onClick={() => nextPage()}
        disabled={!canNextPage}
      >
        <ArrowRight />
      </button>
    </PaginationStyled>
  )
}

const PaginationStyled = styled.div`
  display: flex;
  gap: 3px;
  color: #333;

  .navButton {
    border: none;
    background: white;
    text-align: center;
    width: 1.5rem;
    height: 1.5rem;
    font-size: 0.875rem;
    outline: none;
    :disabled {
      cursor: default;
      background: transparent;
      border: none;
    }
    :not(:disabled):hover {
      color: white;
      border-radius: 5px;
      border: 1px solid var(--clr-primary-dark);
      cursor: pointer;
      background: linear-gradient(
        to bottom,
        var(--clr-primary-light) 0%,
        var(--clr-primary) 100%
      );
    }
  }
  .actual {
    border: 1px solid #979797;
    background: linear-gradient(to bottom, #fff 0%, #dcdcdc 100%);
    cursor: default;
    border-radius: 5px;
    font-size: 0.875rem;
    outline: none;
  }
  .arrow {
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

export default Pagination
