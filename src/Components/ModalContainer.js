import styled from 'styled-components'
import React, {
  useMemo,
  Fragment,
  useState,
  useEffect,
  useRef,
  forwardRef
} from 'react'
import { useTable, useSortBy, useExpanded, usePagination } from 'react-table'
import sortAsc from '../Assets/sort_asc.png'
import sortDesc from '../Assets/sort_desc.png'
import sortBoth from '../Assets/sort_both.png'
import { data as tableData, getColumns } from '../data'
import Pagination from './Pagination'
import Info from './Info'
import RowPerPage from './RowPerPage'
import Filter from './Filter'
import { FaTrashAlt as DeleteRow } from 'react-icons/fa'
import useMedia from '../hooks/useMedia'

const IndeterminateCheckbox = forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = useRef()
  const resolvedRef = ref || defaultRef

  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate
  }, [resolvedRef, indeterminate])

  return <input type='checkbox' ref={resolvedRef} {...rest} />
})

const ModalContainer = () => {
  const [data, setData] = useState([])
  const [filterAll, setFilterAll] = useState('')
  const mobile = useMedia('(max-width: 40rem)')

  const columns = useMemo(
    () => getColumns(mobile),
    [mobile]
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
    allColumns,
    getToggleHideAllColumnsProps,
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
    const { resumo } = row.original
    return (
      <RowDetail>
        <div>
          Resumo:
          <span>{resumo}</span>
        </div>
        {
          row.cells.filter(e => e.column.toHide).map(cell => (
            <div key={cell.column.id}>
              {cell.column.Header}:
              <span>{cell.value}</span>
            </div>
          ))
        }
      </RowDetail>
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

  const handleDeleteRowClick = (row) => () => {
    setData((prev) => prev.filter((elem) => elem.id !== row.original.id))
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
          if (key!=='id' && value?.toUpperCase().includes(filterAll.trimStart().trimEnd().toUpperCase())){
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
          <div>
            <div>
              <IndeterminateCheckbox {...getToggleHideAllColumnsProps()} />{' '}
              Toggle All
            </div>
            {allColumns.map((column) => {
              if ((column.id!=='expander') && (column.id!=='acao')) {
              return (
                <div key={column.id}>
                  <label>
                    <input type='checkbox' {...column.getToggleHiddenProps()} />{' '}
                    {column.Header}
                  </label>
                </div>
              )} else return null
            })}
            <br />
          </div>
          <TableHeader>
            <RowPerPage
              pageSize={pageSize}
              setPageSize={(e) => setPageSize(e)}
              totalRows={totalRows}
            />
            <Filter filterAll={filterAll} onChange={(e) => onChangeFilter(e)} />
          </TableHeader>
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    // Add the sorting props to control sorting. For this example
                    // we can add them into the header props "column.getSortByToggleProps()"
                    (!column.toHide) &&
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
                        var icon = ''
                        if (cell.column.id === 'acao') {
                          icon = (
                            <RowActions>
                              <DeleteRow onClick={handleDeleteRowClick(row)} />
                            </RowActions>
                          )
                        }
                        return (
                          (!cell.column.toHide) &&
                          <td {...cell.getCellProps()}>
                            <div className='cell'>
                              {icon}
                              {cell.render('Cell')}
                            </div>
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

const RowDetail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  div {
    font-size: .9rem;
    font-weight: 700;
    color: var(--clr-primary);
    text-align: justify;
    span {
      color: var(--bs-gray);
      font-weight: 400;
      margin: 0 0 0 10px;
    }
  }
`

const RowActions = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: row;
  width: 100%;
  gap: 0.3rem;
  cursor: pointer;
  svg:hover {
    color: var(--bs-danger);
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
  gap: 1rem;
  @media (max-width: 40rem) {
    flex-flow: wrap;
    & div {
      margin-left: auto;
    }
  }
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
              div.iconGroup {
                display: flex;
                flex-direction: row;
                justify-content: space-evenly;
                gap: 0.3rem;
                .icon {
                  margin: 0;
                  width: 18px;
                  height: 18px;
                }
              }
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
  overflow: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  //Breakpoints 
  @media (max-width: 40rem) { //640px
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    border-radius: 0;
    transform: translate(0%, 0%);
    header {
      border-radius: 0;
    }
  }
  @media (min-width: 40rem) and (max-width: 56.25rem) { //640px e 900px
    min-width: 90%;
  }
  @media (min-width: 56.25rem) and (max-width: 75rem) { //900px e 1200px
    min-width: 85%;
  }
  @media (min-width: 75rem) { //1200px
    min-width: 68rem; //1088px
  }
`

const Content = styled.section`
  display: flex;
  justify-content: space-around;
  align-content: center;
  padding: 1rem;
`

export default ModalContainer
