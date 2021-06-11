import React from 'react'
import styled from 'styled-components'

const Info = ({ totalRows, rowOnPage, rowPerPage }) => {
  return (
    <InfoStyled>
      {totalRows ? (
        `Visualizando de ${rowOnPage} à ${rowPerPage} (${totalRows} registros)`
      ) : (
        <EmptyTable>Tabela vazia</EmptyTable>
      )}
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
