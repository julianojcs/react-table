import styled from "styled-components";
import React, { useMemo, useState, Fragment } from "react";
import { useTable, useSortBy, useExpanded, usePagination } from "react-table";
import {
  RiArrowRightSFill as ArrowRight,
  RiArrowLeftSFill as ArrowLeft,
  RiArrowDownSFill as ArrowDown
} from "react-icons/ri";
import sortAsc from "./Assets/sort_asc.png";
import sortDesc from "./Assets/sort_desc.png";
import sortBoth from "./Assets/sort_both.png";

const ModalContainer = ({ coin, base, entidade, id, card, setShowModal }) => {
  // const [selectOptions, setSelectOptions] = useState([])
  // const { loading, request } = useFetch()

  const data = useMemo(
    () => [
      {
        nome: "Imagine",
        dataInicio: "2018-09-01",
        dataFim: "2018-05-30",
        resumo: "Durante operações de combate."
      },
      {
        nome: "Catalão",
        dataInicio: "2021-04-11",
        dataFim: null,
        resumo: "Filho De Maria."
      },
      {
        nome: "Casa",
        dataInicio: "2018-09-01",
        dataFim: "2018-05-30",
        resumo: "De novo não hein."
      },
      {
        nome: "Futebol",
        dataInicio: "2021-04-11",
        dataFim: null,
        resumo: "Filho De Luis Carlos."
      },
      {
        nome: "Hometown",
        dataInicio: "2018-09-01",
        dataFim: "2018-05-30",
        resumo: "Durante os anos 20."
      },
      {
        nome: "Espanhol",
        dataInicio: "2021-04-11",
        dataFim: null,
        resumo: "Pai De Juan."
      },
      {
        nome: "Casa Blanca",
        dataInicio: "2018-09-01",
        dataFim: "2018-05-30",
        resumo: "General da 2a guerra"
      },
      {
        nome: "Fortunato Abreu",
        dataInicio: "2021-04-11",
        dataFim: null,
        resumo: "Desaparecido a 1 mês."
      }
    ],
    []
  );

  const columns = useMemo(
    () => [
      {
        // Header: () => null,
        Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
          <span {...getToggleAllRowsExpandedProps()}>
            {isAllRowsExpanded ? <ArrowDown /> : <ArrowRight />}
          </span>
        ),
        id: "expander",
        disableSortBy: true,
        Cell: ({ row }) => (
          <span {...row.getToggleRowExpandedProps()}>
            {/* {row.isExpanded ? <FaChevronUp /> : <FaChevronDown />} */}
            {row.isExpanded ? <ArrowDown /> : <ArrowRight />}
          </span>
        )
      },
      {
        Header: "Nome",
        accessor: "nome" // accessor is the "key" in the data
      },
      {
        Header: "Início",
        accessor: "dataInicio"
      },
      {
        Header: "Fim",
        accessor: "dataFim"
      },
      {
        Header: "Ação",
        accessor: "acao",
        width: 50,
        disableSortBy: true
      }
    ],
    []
  );

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
    console.log(row.original);
    const { resumo } = row.original;
    return (
      <div>
        Resumo:<span>{resumo}</span>
      </div>
    );
  };

  const generateSortingIndicator = (column) => {
    return (
      <span>
        {column.isSorted ? (
          column.isSortedDesc ? (
            <img src={sortDesc} alt="sort descendent" />
          ) : (
            <img src={sortAsc} alt="sort ascendent" />
          )
        ) : column.disableSortBy ? null : (
          <img src={sortBoth} alt="sort Disabled" />
        )}
      </span>
    );
  };

  const totalRows = rows.length
  const rowPerPage = pageIndex * pageSize + page.length
  const rowOnPage = rows.length > 0 ? (pageIndex * pageSize + 1) : 0

  return (
    <ModalContainerStyled>
      <Content>
        <Styles>
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
                        {column.render("Header")}
                        {generateSortingIndicator(column)}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                console.log(row);
                return (
                  <Fragment key={row.getRowProps().key}>
                    <tr>
                      {row.cells.map((cell) => {
                        return (
                          <td {...cell.getCellProps()}>
                            {cell.render("Cell")}
                          </td>
                        );
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
                );
              })}
            </tbody>
          </table>
          <TableFooter>
            <Info>
              {totalRows 
              ? `Visualizando de ${rowOnPage} à ${rowPerPage} (${totalRows} registros)`
              : <EmptyTable>Tabela vazia</EmptyTable>
              }
            </Info>

            {!!totalRows && 
            <Pagination>
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
            </Pagination>}
          </TableFooter>
          <pre>
            <code>{JSON.stringify({ expanded: expanded }, null, 2)}</code>
          </pre>
        </Styles>
      </Content>
    </ModalContainerStyled>
  );
};

const EmptyTable = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--bs-danger);
`

const TableComponents = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const TableFooter = styled(TableComponents)`
  align-items: flex-end;
`;

const Pagination = styled.div`
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
`;

const Info = styled.div`
  white-space: nowrap;
  width: 100%;
  padding-top: 0.85rem;
  color: #333;
  font-size: 0.875rem;
  line-height: 1.5;
  outline: none;
  text-align: left;
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
    thead {
      color: var(--clr-secondary-dark);
      tr {
        border-bottom: 1px solid var(--clr-primary);
        vertical-align: baseline;
        th {
          padding-left: 0.3rem;
          :first-child {
            div { 
              padding-left: 0;
              justify-content: center;
            }
            padding-left: 0;
            width: 2rem;
          }
          :last-child {
            width: 3.5rem;
          }
        }
        div {
          display: flex;
          justify-content: space-between;
          align-content: center;
          user-select: none;
          :hover{
            color: var(--clr-primary);
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
              svg:hover{
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
`;

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
  }
`;

const Content = styled.section`
  display: flex;
  justify-content: space-around;
  align-content: center;
  padding: 1rem;
`;

export default ModalContainer;
