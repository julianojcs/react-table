import React from 'react'
import styled from 'styled-components'
import { ReactComponent as CrossIcon } from '../Assets/cross.svg'

const Filtered = ({ text, filtered, onClear }) => {
  return (
    <>
      {' '}
      <FilteredStyled className={`${filtered ? '' : 'filtered'}`}>
        {text}
        <Cross className={`${Filtered ? 'fade' : ''}`} onClick={onClear} />
      </FilteredStyled>
    </>
  )
}

const FilteredStyled = styled.span`
  display: none;
  color: var(--bs-danger);
  font-weight: 600;
  /* text-decoration: dashed underline var(--bs-danger); */
  transition: all 0.5s ease-out;
  &.filtered {
    display: inline-flex;
  }
`
const Cross = styled(CrossIcon)`
  color: var(--bs-danger);
  cursor: pointer;
  font-size: 14px;
  opacity: 0;
  user-select: none;
  pointer-events: none;
  /* transform: scale(0); */
  transition: all 0.2s ease-out;
  align-self: center;
  margin: 0.05rem 0.1rem 0 0.2rem;
  &.fade {
    /* transform: scale(1); */
    opacity: 1;
    user-select: initial;
    pointer-events: initial;
  }
`

export default Filtered
