
import { useCallback } from "react";
import { useTable, useGlobalFilter, useSortBy, usePagination } from "react-table";
import TableHead from "../components/TableHead";
import TableFooter from "../components/TableFooter";

function TableContainer({ columns, data, handleAdd }) {
  
  //handle sorting of only the address, city and state columns in the table
  const handleGlobalFilterFunction = useCallback((rows, ids, query) => {
    return rows.filter(
      row =>
        row.values["address1"].includes(query) ||
        row.values["city"].includes(query) ||
        row.values["state"].includes(query)
    );
  }, []);
    
  const {
    getTableProps, 
    getTableBodyProps, 
    headerGroups, 
    page, 
    prepareRow,
    setGlobalFilter,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    setPageSize,
    state
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 5  },
      globalFilter: handleGlobalFilterFunction
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );
    
  //called when filter input chnages  
  const handleFilterInputChange = (e) => {
    const { value } = e.currentTarget;
    setGlobalFilter(value);
  };


  return (
    <div>
      <TableHead
        handleFilterInputChange={handleFilterInputChange}
        handleAdd={handleAdd}
      />
      <table
        {...getTableProps()}
        className="table-auto divide-y divide-gray-300"
      >
        <thead className="bg-gray-100">
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={`px-6 py-2 text-xs text-gray-500`}
                >
                  <div className="flex items-center justify-between">
                    {column.render("Header")}
                    <span>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <svg
                            className="w-4 h-4 text-gray-800"
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 320 512"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"></path>
                          </svg>
                        ) : (
                          <svg
                            className="w-4 h-4 text-gray-800"
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 320 512"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M279 224H41c-21.4 0-32.1-25.9-17-41L143 64c9.4-9.4 24.6-9.4 33.9 0l119 119c15.2 15.1 4.5 41-16.9 41z"></path>
                          </svg>
                        )
                      ) : (
                        <svg
                          className="w-4 h-4 text-gray-800 opacity-0 hover:opacity-100"
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 320 512"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41zm255-105L177 64c-9.4-9.4-24.6-9.4-33.9 0L24 183c-15.1 15.1-4.4 41 17 41h238c21.4 0 32.1-25.9 17-41z"></path>
                        </svg>
                      )}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody
          {...getTableBodyProps()}
          className="bg-white divide-y divide-gray-300"
        >
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="whitespace-nowrap">
                {row.cells.map(cell => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className="px-6 py-4 text-sm text-gray-500"
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <TableFooter
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        pageOptions={pageOptions}
        nextPage={nextPage}
        previousPage={previousPage}
        setPageSize={setPageSize}
        pageSize={state.pageSize}
        pageIndex={state.pageIndex}
      />
    </div>
  );
}

export default TableContainer;