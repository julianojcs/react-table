import styled from "styled-components";
import React, { useMemo } from "react";
import { useTable, useSortBy, useExpanded, usePagination } from "react-table";
import {
  FaChevronDown as DownIcon,
  FaChevronUp as UpIcon
} from "react-icons/fa";
import { Fragment } from "react";
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
            {isAllRowsExpanded ? <UpIcon /> : <DownIcon />}
          </span>
        ),
        id: "expander",
        disableSortBy: true,
        Cell: ({ row }) => (
          <span {...row.getToggleRowExpandedProps()}>
            {/* {row.isExpanded ? <FaChevronUp /> : <FaChevronDown />} */}
            {row.isExpanded ? <UpIcon /> : <DownIcon />}
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

  const tableInstance = useTable(
    {
      data,
      columns,
      defaultPageSize: 10,
      showPagination: true,
      initialState: { expanded: false }
    },
    useSortBy,
    useExpanded,
    useExpanded,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { expanded },
    visibleColumns
  } = tableInstance;

  //   const getOptions = async () => {
  //     const options = POST_OPTIONS_SELECT(coin, base)
  //     const { response, json } = await request(API_URL, options)
  //
  //     if (response.status !== 200 && response.status !== 201) {
  //       throw new Error(`Token inválido`)
  //     }
  //
  //     setSelectOptions(json.data.options)
  //   }

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
              {rows.map((row) => {
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
          <div style={{ paddingTop: "1rem" }}>
            Showing the first {rows.length > 10 ? "10" : rows.length} results of{" "}
            {rows.length} rows
          </div>
          <pre>
            <code>{JSON.stringify({ expanded: expanded }, null, 2)}</code>
          </pre>
        </Styles>
      </Content>
    </ModalContainerStyled>
  );
};

const Styles = styled.div`
  padding: 1rem;
  max-width: 100%;
  width: 100%;

  table {
    border-spacing: 0;
    width: 100%;
    thead {
      tr {
        th {
          padding-left: 0.3rem;
        }
        div {
          display: flex;
          justify-content: space-between;
          align-content: center;
          user-select: none;
        }
      }
    }
    tbody {
      tr {
        td {
          margin: 0;
          padding: 0.3rem;
          border-top: 1px solid #ddd;
          border-right: 1px solid #ddd;
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
