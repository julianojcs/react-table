import React from 'react'
import styled from 'styled-components'
import SearchIcon from '../Assets/find.svg'
import SearchIconRed from '../Assets/find_red.svg'
import {ReactComponent as CrossIcon} from '../Assets/cross.svg'

const Filter = ({ filterAll, onChange, inputRef, onClear }) => {
  return (
    <FilterWrapper>
      <FilterStyled label='Pesquisar' on={filterAll}>
        <input
          type='text'
          spellCheck='false'
          autoComplete='off'
          ref={inputRef}
          value={filterAll}
          onChange={(e) => onChange(e)}
          placeholder='Digite um texto...'
        ></input>
        <Cross className={`${filterAll ? 'fade' : ''}`} onClick={onClear}/>
      </FilterStyled>
    </FilterWrapper>
  )
}

const Cross = styled(CrossIcon)`
  position: absolute;
  color: var(--bs-danger);
  right: 1.8rem;
  top: 0.58rem;
  cursor: pointer;
  font-size: 14px;
  opacity: 0;
  user-select: none;
  pointer-events: none;
  /* transform: scale(0); */
  transition: all 0.2s ease-out;
  &.fade {
    /* transform: scale(1); */
    opacity: 1;
    user-select: initial;
    pointer-events: initial;
  }
`

const FilterWrapper = styled.div`
  display: flex;
  position: relative;
  user-select: none;
`

const FilterStyled = styled.span`
  position: relative;
  input {
    padding: 0.3rem 2.6rem 0.3rem 0.3rem;
    min-width: 19rem;
    outline: none;
    min-height: 1.1876em;
    width: auto;
    padding-left: 0.6rem;
    border: 1px solid rgba(0, 0, 0, 0.26);
    border-radius: 4px;
    border: ${({ on }) => ( on ? '1px solid var(--bs-danger)': '1px solid rgba(0, 0, 0, 0.26)')};
    box-shadow: ${({ on }) => ( on ? '0px 0px 0px 1px var(--bs-danger)': 'none')};
    color: ${({ on }) => ( on ? 'var(--bs-danger)': 'initial')};
    transition: all 0.5s ease-out;
    :hover,
    :focus {
      border-color: rgba(0, 0, 0, 0.87);
      border-color: ${({ on }) => ( on ? 'var(--bs-danger)': 'rgba(0, 0, 0, 0.87)')};
    }
  }
  :before {
    content: 'Pesquisar';
    transform-origin: top left;
    transform: translate(10px, -6px) scale(0.75);
    color: ${({ on }) => ( on ? 'var(--bs-danger)': 'rgba(0, 0, 0, 0.54)')};
    font-size: 1rem;
    font-weight: 400;
    line-height: 1;
    letter-spacing: 0.00938em;
    background-color: white;
    padding: 0 0.4rem;
    display: inline-block;
    position: absolute;
    pointer-events: none;
  }
  :after {
    content: '';
    display: inline-block;
    width: 20px;
    height: 20px;
    background-position: center center;
    background-repeat: no-repeat;
    background-image: url(${SearchIcon});
    background-image: url(${SearchIconRed});
    background-image: ${({ on }) => ( on ? `url(${SearchIconRed})`: `url(${SearchIcon})`)};
    margin-left: 0.5rem;
    position: absolute;
    top: 6px;
    right: 7px;
    pointer-events: none;
    transition: all 0.5s ease-out;
  }
`

export default Filter