import React from 'react'
import styled from 'styled-components'
import Filtered from './Filtered'

const Info = ({ totalRows, rowOnPage, rowPerPage, filtered, onClear }) => {
  return (
    <InfoStyled>
      {totalRows
        ?
          <>
            Visualizando de {rowOnPage} à {rowPerPage} {' '}
            ({totalRows} registros{!filtered ? <Filtered filtered={filtered} onClear={onClear} text='filtrados'/>: ''})
            {/* ({totalRows} registros{!filtered ? <>{' '}<Filtered>filtrados</Filtered></> : ''}) */}
          </>
        :
            <EmptyTable>
              Tabela vazia {' '}
              {!filtered ? <Filtered filtered={filtered} onClear={onClear} text=' - com filtros'/>: ''}
            </EmptyTable>
      }
    </InfoStyled>
  )
}

const EmptyTable = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--bs-danger);
  margin-right: 0.3rem;
`

const InfoStyled = styled.div`
  white-space: nowrap;
  width: 100%;
  padding-top: 0.85rem;
  color: #333;
  font-size: 0.875rem;
  line-height: 1.5;
  outline: none;
  text-align: left;
`

export default Info
