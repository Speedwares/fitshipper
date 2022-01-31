
function TableFooter({canPreviousPage, canNextPage, nextPage, previousPage, pageIndex, pageOptions, pageSize, setPageSize }) {

return (
  <div>
    <div className="flex-1 flex justify-between sm:hidden">
      <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50" onClick={() => previousPage()} disabled={!canPreviousPage}> Previous </button>
      <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50" onClick={() => nextPage()} disabled={!canNextPage}> Next </button>
    </div>
    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between mb-10">
      <div className="flex gap-x-2">
        <span className="text-sm text-gray-700">
          Page <span className="font-medium">{pageIndex + 1}</span> of <span className="font-medium">{pageOptions.length}</span>
        </span>
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}>
          
          {[5, 10, 25].map(nopageSize => (
            <option key={nopageSize} value={nopageSize}>
              Show {nopageSize}
            </option>
          ))}
        </select>
      </div>
      </div>
  </div>
);
}


export default TableFooter;
