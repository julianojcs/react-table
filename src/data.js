import React from 'react'
import { FaCaretDown as DownIcon, FaCaretRight as RightIcon } from 'react-icons/fa'
import { BsList, BsListNested } from 'react-icons/bs'

const data = [
  {
    id: 1,
    nome: 'Imagine',
    dataInicio: '2018-09-01',
    dataFim: '2018-05-30',
    resumo: 'Durante operações de combate.'
  },
  {
    id: 2,
    nome: 'Catalão',
    dataInicio: '2021-04-11',
    dataFim: null,
    resumo: 'Filho De Maria.'
  },
  {
    id: 3,
    nome: 'Casa',
    dataInicio: '2018-09-01',
    dataFim: '2018-05-30',
    resumo: 'De novo não hein.'
  },
  {
    id: 4,
    nome: 'Futebol',
    dataInicio: '2021-04-11',
    dataFim: null,
    resumo: 'Filho De Luis Carlos.'
  },
  {
    id: 5,
    nome: 'Hometown',
    dataInicio: '2018-09-01',
    dataFim: '2018-05-30',
    resumo: 'Durante os anos 20.'
  },
  {
    id: 6,
    nome: 'Espanhol',
    dataInicio: '2021-04-11',
    dataFim: null,
    resumo: 'Pai De Juan.'
  },
  {
    id: 7,
    nome: 'Casa Blanca',
    dataInicio: '2018-09-01',
    dataFim: '2018-05-30',
    resumo: 'General da 2a guerra'
  },
  {
    id: 8,
    nome: 'Fortunato Abreu',
    dataInicio: '2021-04-11',
    dataFim: null,
    resumo: 'Desaparecido a 1 mês.'
  }
]

const Header = ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
  <div {...getToggleAllRowsExpandedProps()}>
    {isAllRowsExpanded ? (
      <BsListNested className='bold' />
    ) : (
      <BsList className='bold' />
    )}
  </div>
)

const Expander = ({ row }) => {
  // console.log(row.getToggleRowExpandedProps())
  return (
    <div {...row.getToggleRowExpandedProps()}>
      {row.isExpanded ? <DownIcon /> : <RightIcon />}
    </div>
  )
}

const getColumns = (hide) => [
  {
    Header,
    id: 'expander',
    disableSortBy: true,
    Cell: Expander
  },
  {
    Header: 'Nome',
    accessor: 'nome' // accessor is the "key" in the data
  },
  {
    Header: 'Data Início',
    toHide: hide,
    accessor: 'dataInicio'
  },
  {
    Header: 'Data Fim',
    toHide: hide,
    accessor: 'dataFim'
  },
  {
    Header: 'Ação',
    accessor: 'acao',
    width: 50,
    disableSortBy: true
  }
]

export {
  data,
  getColumns
}