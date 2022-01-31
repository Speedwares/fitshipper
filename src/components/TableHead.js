
function TableHead({ handleFilterInputChange, handleAdd }) {

  return (
    <div>
      <div className="text-left">
        <button
          className="bg-blue-500 text-white px-3 py-2 mb-2 rounded"
          onClick={e => handleAdd()}
        >
          {" "}
          Add Adress
        </button>
      </div>
      <div className="flex">
        <div className="w-full text-right">
          <input
            className="py-2 px-1 mb-2 object-left border border-gray-300 rounded-lg justify-start"
            onChange={handleFilterInputChange}
            placeholder={"Filter fields"}
          />
        </div>
      </div>
    </div>
  );
}

export default TableHead
