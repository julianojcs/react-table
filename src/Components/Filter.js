import React from 'react'
import styled from 'styled-components'
import searchIcon from '../Assets/find.svg'

const Filter = ({ filterAll, onChange }) => {
  return (
    <FilterWrapper>
      <FilterStyled label='Pesquisar'>
        <input
          type='text'
          value={filterAll}
          // onChange={(e) => onChange(e)}
          placeholder='Digite um texto...'
        ></input>
      </FilterStyled>
    </FilterWrapper>
  )
}

const FilterWrapper = styled.div`
  display: flex;
  position: relative;
  user-select: none;
`

const FilterStyled = styled.span`
  input {
    padding: 0.3rem 2rem 0.3rem 0.3rem;
    min-width: 19rem;
    outline: none;
    min-height: 1.1876em;
    width: auto;
    padding-left: 0.6rem;
    border: 1px solid rgba(0, 0, 0, 0.26);
    border-radius: 4px;
    :hover,
    :focus {
      border-color: rgba(0, 0, 0, 0.87);
    }
  }
  :before {
    content: 'Pesquisar';
    transform-origin: top left;
    transform: translate(10px, -6px) scale(0.75);
    color: rgba(0, 0, 0, 0.54);
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
    background: url(${searchIcon}) no-repeat center center;
    margin-left: 0.5rem;
    position: absolute;
    top: 6px;
    right: 7px;
    pointer-events: none;
  }
`

export default Filter
