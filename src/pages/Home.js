import { useState, useEffect, useMemo } from "react";
import axios from "axios";

import TableContainer from "./../containers/TableContainer";
import Modal from "./../components/Modal";
import DeleteModal from "./../components/DeleteModal";

function Home() {

  //state to store data from the API
  const [data, setData] = useState([]);

  const [open, setOpen] = useState(false);

  const [openDel, setOpenDel] = useState(false);

  const [formData, setFormData] = useState({});
    
  //define api url for get the addresses
  const apiUrl = "https://fsl-candidate-api-vvfym.ondigitalocean.app/v1/address";

  //toggle the add and edit modal  
  const toggleModal = () => setOpen(!open);

  const toggleDeleteModal = () => setOpenDel(!openDel);

  const [reqType, setReqType] = useState("");

  //initialize the table with rows and columns
  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
        disableSortBy: true
      },
      {
        Header: "Name",
        accessor: "name",
        disableSortBy: true
      },
      {
        Header: "Address1",
        accessor: "address1"
      },
      {
        Header: "Address2",
        accessor: "address2",
        disableSortBy: true
      },
      {
        Header: "City",
        accessor: "city"
      },
      {
        Header: "State",
        accessor: "state"
      },
      {
        Header: "Zip",
        accessor: "zip",
        disableSortBy: true
      },
      {
        Header: "",
        accessor: "actions",
        Cell: row => (
          <div>
            <button
              className="bg-blue-500 text-white py-1 px-3 rounded mr-1"
              onClick={e => handleEdit(row.row.original)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white py-1 px-3 rounded ml-1"
              onClick={e => handleDelete(row.row.original)}
            >
              Delete
            </button>
          </div>
        )
      }
    ],
    []
  );

  //bring uo the edit form modal
  function handleEdit(row) {
    setReqType("edit");
    setFormData(row);
    toggleModal();
  }

  //add new address
  function handleAdd() {
    setReqType("add");

    let newAddress = {
      name: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zip: ""
    };
    setFormData(newAddress);
    toggleModal();
  }

  //bring up the delete modal
  function handleDelete(row) {
    setFormData(row);
    toggleDeleteModal();
  }

  //get the data from the API and set the state
  function getData() {
    (async () => {
      const result = await axios(apiUrl);
      setData(result.data);
    })();
  }

  // Using useEffect to call the API once mounted and set the data
  useEffect(() => {
    getData();
  }, []);
    

  return (
    <div>
      {open && (
        <Modal
          toggleModal={toggleModal}
          reqType={reqType}
          show={open}
          formData={formData}
          getData={getData} />
      )}
      {openDel && (
        <DeleteModal
          toggleDeleteModal={toggleDeleteModal}
          show={openDel}
          formData={formData}
          getData={getData} />
      )}
      <div className="container flex justify-center mx-auto mt-10">
        <div className="flex flex-col">
          <div className="w-full">
            <TableContainer
              columns={columns}
              data={data}
              handleAdd={handleAdd} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
