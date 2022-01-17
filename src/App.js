import { useState, useEffect, useMemo } from "react";
import axios from "axios";

import './App.css';
import Table from "./components/Table";
import Modal from "./components/Modal";
import DeleteModal from "./components/DeleteModal";


function App() {

  const [data, setData] = useState([]);

  const [open, setOpen] = useState(false);

  const [openDel, setOpenDel] = useState(false);

  const [formData, setFormData] = useState({});

  const toggleModal = () => setOpen(!open);

  const toggleDeleteModal = () => setOpenDel(!openDel);

  const [reqType, setReqType] = useState("");

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
            <button className="bg-blue-500 text-white py-1 px-3 rounded mr-1" onClick={(e) => handleEdit(row.row.original)}>Edit</button>
            <button className="bg-red-500 text-white py-1 px-3 rounded ml-1" onClick={(e) => handleDelete(row.row.original)}>Delete</button>
          </div>
        )
      }
    ],
    []
  );

  function handleEdit(row) {
    setReqType("edit")
    setFormData(row)
    toggleModal();
  }

  function handleAdd() {
    setReqType("add");

    let newAddress = {
      name: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zip: ""
    }
    setFormData(newAddress)
    toggleModal();

  }

  function handleDelete(row) {
    setFormData(row);
    toggleDeleteModal();
  }

  function getData() {
    (async () => {
      const result = await axios(
        "https://fsl-candidate-api-vvfym.ondigitalocean.app/v1/address"
      );
      setData(result.data);
    })();
  }


  // Using useEffect to call the API once mounted and set the data
  useEffect(() => {

    getData();

  }, []);

  return (
    <div className="App">
      {open && (
        <Modal
          toggleModal={toggleModal}
          reqType={reqType}
          show={open}
          formData={formData}
          getData={getData}
        />
      )}
      {openDel && (
        <DeleteModal
          toggleDeleteModal={toggleDeleteModal}
          show={openDel}
          formData={formData}
          getData={getData}
        />
      )}
      <div className="container flex justify-center mx-auto mt-10">
        <div className="flex flex-col">
          <div className="w-full">
            <div className="text-left">
              <button className="bg-blue-500 text-white px-3 py-2 mb-2 rounded" onClick={(e) => handleAdd()}> Add Adress</button>
            </div>
            <Table columns={columns} data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
