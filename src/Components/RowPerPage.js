import React from 'react'
import styled from 'styled-components'
import { Select, MenuItem, InputLabel, FormControl } from '@material-ui/core'

const RowPerPage = ({ pageSize, setPageSize, totalRows }) => {
  return (
    <RowPerPageStyled>
      <FormControl variant='outlined'>
        <InputLabel id='rowPerPageLabel'>Exibir</InputLabel>
        <Select
          labelId='rowPerPageLabel'
          id='rowPerPage'
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value))
          }}
          label='Exibir'
        >
          <MenuItem value={3}>Três linhas</MenuItem>
          <MenuItem value={5}>Cinco linhas</MenuItem>
          <MenuItem value={7}>Sete linhas</MenuItem>
          <MenuItem value={totalRows}>Todas as linhas</MenuItem>
        </Select>
      </FormControl>
    </RowPerPageStyled>
  )
}

const RowPerPageStyled = styled.div`
  color: #333;
  font-size: 0.875rem;
  line-height: 1.5;
  outline: none;

  .MuiOutlinedInput-input {
    padding: 0.3rem;
  }
  .MuiInputLabel-outlined {
    z-index: inherit;
  }
  .MuiSelect-selectMenu {
    min-height: 0.9rem;
    padding-top: 0.4rem;
    padding-left: 0.6rem;
  }
`

export default RowPerPage
