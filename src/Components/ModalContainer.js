import styled from 'styled-components'
import React, { useMemo, Fragment, useState, useEffect } from 'react'
import { useTable, useSortBy, useExpanded, usePagination } from 'react-table'
import {
  RiArrowRightSFill as ArrowRight,
  RiArrowDownSFill as ArrowDown
} from 'react-icons/ri'
import sortAsc from '../Assets/sort_asc.png'
import sortDesc from '../Assets/sort_desc.png'
import sortBoth from '../Assets/sort_both.png'
import { data as tableData } from '../data'
import Pagination from './Pagination'
import Info from './Info'
import RowPerPage from './RowPerPage'
import Filter from './Filter'

const ModalContainer = () => {
  const [data, setData] = useState([])
  const [filterAll, setFilterAll] = useState('')

  const columns = useMemo(
    () => [
      {
        // Header: () => null,
        Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
          <span {...getToggleAllRowsExpandedProps()}>
            {isAllRowsExpanded ? <ArrowDown /> : <ArrowRight />}
          </span>
        ),
        id: 'expander',
        disableSortBy: true,
        Cell: ({ row }) => (
          <span {...row.getToggleRowExpandedProps()}>
            {/* {row.isExpanded ? <FaChevronUp /> : <FaChevronDown />} */}
            {row.isExpanded ? <ArrowDown /> : <ArrowRight />}
          </span>
        )
      },
      {
        Header: 'Nome',
        accessor: 'nome' // accessor is the "key" in the data
      },
      {
        Header: 'Início',
        accessor: 'dataInicio'
      },
      {
        Header: 'Fim',
        accessor: 'dataFim'
      },
      {
        Header: 'Ação',
        accessor: 'acao',
        width: 50,
        disableSortBy: true
      }
    ],
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    page,
    prepareRow,
    visibleColumns,
    canPreviousPage,
    canNextPage,
    pageOptions,
    // pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { expanded, pageIndex, pageSize }
  } = useTable(
    {
      data,
      columns,
      showPagination: true,
      initialState: { expanded: {}, pageIndex: 0, pageSize: 3 }
    },
    useSortBy,
    useExpanded,
    usePagination
  )

  const renderRowSubComponent = (row) => {
    console.log(row.original)
    const { resumo } = row.original
    return (
      <div>
        Resumo:<span>{resumo}</span>
      </div>
    )
  }

  const generateSortingIndicator = (column) => {
    return (
      <span>
        {column.isSorted ? (
          column.isSortedDesc ? (
            <img src={sortDesc} alt='sort descendent' />
          ) : (
            <img src={sortAsc} alt='sort ascendent' />
          )
        ) : column.disableSortBy ? null : (
          <img src={sortBoth} alt='sort Disabled' />
        )}
      </span>
    )
  }
  
  const onChangeFilter = ({target}) => {
    setFilterAll(target.value)
  }

  const totalRows = rows.length
  const rowPerPage = pageIndex * pageSize + page.length
  const rowOnPage = rows.length > 0 ? pageIndex * pageSize + 1 : 0

  useEffect(() => {
    var theData = []
    if (filterAll) {
      theData = tableData.filter(row => {
        var result = false
        for (const [key, value] of Object.entries(row)) {
          if (key!=='id' && value?.toUpperCase().includes(filterAll.toUpperCase())){
            result = true
            break
          }
        }
        return result
      })
    } else {
      theData = tableData
    }
    setData(theData)
    }, [filterAll]
  )

  return (
    <ModalContainerStyled>
      <Content>
        <Styles>
          <TableHeader>
            <RowPerPage
              pageSize={pageSize}
              setPageSize={(e) => setPageSize(e)}
              totalRows={totalRows}
            />
            <Filter
              filterAll={filterAll}
              onChange={(e) => onChangeFilter(e)}
            />
          </TableHeader>
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    // Add the sorting props to control sorting. For this example
                    // we can add them into the header props "column.getSortByToggleProps()"
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      <div>
                        {column.render('Header')}
                        {generateSortingIndicator(column)}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row)
                return (
                  <Fragment key={row.getRowProps().key}>
                    <tr>
                      {row.cells.map((cell) => {
                        return (
                          <td {...cell.getCellProps()}>
                            {cell.render('Cell')}
                          </td>
                        )
                      })}
                    </tr>
                    {row.isExpanded && (
                      <tr>
                        <td colSpan={visibleColumns.length}>
                          {renderRowSubComponent(row)}
                        </td>
                      </tr>
                    )}
                  </Fragment>
                )
              })}
            </tbody>
          </table>
          <TableFooter>
            <Info
              totalRows={totalRows}
              rowOnPage={rowOnPage}
              rowPerPage={rowPerPage}
            />
            {!!totalRows && (
              <Pagination
                previousPage={previousPage}
                nextPage={nextPage}
                canPreviousPage={canPreviousPage}
                canNextPage={canNextPage}
                pageOptions={pageOptions}
                pageIndex={pageIndex}
                gotoPage={gotoPage}
                show={totalRows > pageSize}
              />
            )}
          </TableFooter>
          <pre>
            <code>{JSON.stringify({ expanded: expanded }, null, 2)}</code>
          </pre>
        </Styles>
      </Content>
    </ModalContainerStyled>
  )
}

const FilterWrapper = styled.div`
  position: relative;
  user-select: none;
  width: 20rem;
  background-color: blue;
  @media (max-width: 1024px) {
    width: 100%;
  }
`

const TableComponents = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const TableHeader = styled(TableComponents)`
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-flow: wrap-reverse;
`

const TableFooter = styled(TableComponents)`
  align-items: flex-end;
`

const Styles = styled.div`
  padding: 1rem;
  max-width: 100%;
  width: 100%;

  table {
    border-spacing: 0;
    width: 100%;
    max-height: 100%;
    min-height: 51px;
    overflow-y: auto;
    border-bottom: 1px solid var(--clr-secondary);
    
    thead {
      color: var(--clr-secondary-dark);
      tr {
        border-bottom: 1px solid var(--clr-primary);
        vertical-align: baseline;
        th {
          padding-left: 0.3rem;
          div {
            display: flex;
            justify-content: space-between;
            align-content: center;
            user-select: none;
            white-space: nowrap;
            :hover {
              color: var(--clr-primary);
            }
          }
          :first-child {
            div {
              padding-left: 0;
              justify-content: center;
            }
            padding-left: 0;
            width: 2rem;
          }
          :last-child {
            pointer-events: none;
            width: 3.5rem;
          }
        }
      }
    }
    tbody {
      tr {
        :hover {
          background-color: #f6f6f6 !important;
        }
        td {
          margin: 0;
          padding: 0.3rem;
          border-top: 1px solid #ddd;
          border-right: 1px solid #ddd;
          .cell {
            width: 100%;
            display: flex;
            gap: 0.3rem;
          }
          :first-child {
            div {
              justify-content: center;
              margin-bottom: -2px;
              margin-right: -2px;
              svg:hover {
                color: var(--clr-primary);
              }
            }
          }
        }
        :first-child {
          td {
            border-top: 1px solid #000;
          }
        }
        :last-child {
          td {
            border-bottom: 1px solid #ddd;
          }
        }
        td:first-child {
          border-left: 1px solid #ddd;
          text-align: center;
        }
      }
      tr:nth-child(odd) {
        background: #f9f9f9;
      }
    }
  }
`

const ModalContainerStyled = styled.div`
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  background-color: white;
  position: absolute;
  text-align: justify;
  z-index: 1010;
  border-radius: 5px;
  min-width: 70%;
  width: auto;
  overflow: hidden;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media (max-width: 37.5rem) {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    border-radius: 0;
    transform: translate(0%, 0%);
  }
`

const Content = styled.section`
  display: flex;
  justify-content: space-around;
  align-content: center;
  padding: 1rem;
`

export default ModalContainer
