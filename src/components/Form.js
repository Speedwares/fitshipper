import { useState } from "react";
import axios from "axios";

export default function Form({formData, reqType, toggleModal, getData}) {

    const [formType, setFormType] = useState("fields");

    const [formInput, setFormInput] = useState(formData);

    const [freeFormInput, setFreeFormInput] = useState("");



  //handles form input changes
    function handleChange(e) {
        setFormInput(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    function switchToFreeForm() {

        let formText = `${formInput.name}
${formInput.address1} ${formInput.address2} 
${formInput.city}, ${formInput.state} ${formInput.zip} `

        setFreeFormInput(formText);

        setFormType("freeform");
    }

    //switch for fields form
    function switchToFields() {
        setFormType("fields");
        console.log("freefrominput", freeFormInput);

        const brokenData = freeFormInput.split("\n");


        let addressstr = brokenData[1],
            tokens = addressstr.split(" ").slice(3),
            address2 = tokens.join(" ");


        let tokens2 = addressstr.split(" ").slice(0, 3),
            address1 = tokens2.join(" ");


        let cityInfo = brokenData[2].split(",");

        let stateZip = cityInfo[1].split(" ");

        setFormInput(prevState => ({
            ...prevState,
            name: brokenData[0],
            address1,
            address2,
            city: cityInfo[0],
            state: stateZip[1],
            zip: stateZip[2]
        }));


    }

  //form submission
    function handleSubmit(e) {

        e.preventDefault();

        if (reqType === "add") {

            axios.post('https://fsl-candidate-api-vvfym.ondigitalocean.app/v1/address', formInput )
                .then(res => {
                    toggleModal();
                    getData()
                })
            
        } else if (reqType === "edit") {

            axios.patch('https://fsl-candidate-api-vvfym.ondigitalocean.app/v1/address/'+formInput.id, formInput )
                .then(res => {
                    toggleModal();
                    getData()
                })
        }
        
    }
    
    return(
                
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">

            {formType === "fields" ? ( <form onSubmit={handleSubmit}>
                    <div>
                      <p className="text-right">
                        <a href="#" onClick={() => switchToFreeForm()} className="text-blue-600 text-sm" > Switch to Freeform </a>
                      </p>
                    </div>
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-neutral-600 pb-2">
                      Name
                    </label>
                    <div className="mb-4">
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required=""
                        placeholder="Name"
                        className="
                            block
                            w-full
                            px-5
                            py-2
                            text-base
                            transition
                            duration-500
                            ease-in-out
                            transform
                            border border-gray-300
                            rounded-lg
                            text-neutral-600 
                        "
                          value={formInput?.name}
                          onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-neutral-600 pb-2"
                    >
                      Address
                    </label>
                    <div className="mb-4">
                      <input
                        id="address1"
                        name="address1"
                        type="text"
                        required=""
                        placeholder="Address"
                        className="
                            block
                            w-full
                            px-5
                            py-2
                            text-base
                            transition
                            duration-500
                            ease-in-out
                            transform
                            border border-gray-300
                            rounded-lg
                            text-neutral-600 
                        "
                          value={formInput?.address1}
                          onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="address2"
                      className="block text-sm font-medium text-neutral-600 pb-2"
                    >
                      Address 2 (optional)
                    </label>
                    <div className="mb-4">
                      <input
                        id="address2"
                        name="address2"
                        type="text"
                        required=""
                        placeholder="Address 2"
                        className="
                            block
                            w-full
                            px-5
                            py-2
                            text-base
                            transition
                            duration-500
                            ease-in-out
                            transform
                            border border-gray-300
                            rounded-lg
                            text-neutral-600 
                        "
                          value={formInput?.address2}
                          onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-neutral-600 pb-2"
                    >
                      City
                    </label>
                    <div className="mb-4">
                      <input
                        id="city"
                        name="city"
                        type="text"
                        required=""
                        placeholder="City"
                        className="
                            block
                            w-full
                            px-5
                            py-2
                            text-base
                            transition
                            duration-500
                            ease-in-out
                            transform
                            border border-gray-300
                            rounded-lg
                            text-neutral-600 
                        "
                          value={formInput?.city}
                          onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="state"
                      className="block text-sm font-medium text-neutral-600 pb-2"
                    >
                      State
                    </label>
                      <div className="mb-4">
                      <select
                        id="state"
                        name="state"
                        className="block
                            w-full
                            px-3
                            py-2
                            text-base
                            transition
                            duration-500
                            ease-in-out
                            transform
                            border border-gray-300
                            rounded-lg
                        text-neutral-600"
                          value={formInput?.state}
                          onChange={handleChange}
                      >
                          <option value="NY">NY</option>
                          <option value="TX">TX</option>
                          <option value="AZ">AZ</option>
                          <option value="MI">MI</option>
                          <option value="NV">NV</option>
                          <option value="MN">MN</option>
                          <option value="TN">TN</option>
                          <option value="CA">CA</option>
                          <option value="UT">UT</option>                     
                      </select>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="zip"
                      className="block text-sm font-medium text-neutral-600 pb-2"
                    >
                      Zip
                    </label>
                    <div className="mb-4">
                      <input
                        id="zip"
                        name="zip"
                        type="text"
                        required=""
                        placeholder="Zip"
                        className="
                            block
                            w-full
                            px-5
                            py-2
                            text-base
                            transition
                            duration-500
                            ease-in-out
                            transform
                            border border-gray-300
                            rounded-lg
                            text-neutral-600 
                        "
                          value={formInput?.zip}
                          onChange={handleChange}
                      />
                    </div>
                    </div>
                     <div>
                      <button type="submit" className="
                        flex
                        items-center
                        justify-center
                        w-full
                        px-10
                        py-4
                        text-base
                        font-medium
                        text-center text-white
                        transition
                        duration-500
                        ease-in-out
                        transform
                        bg-blue-600
                        rounded-lg
                        hover:bg-blue-700
                      "> Save Address </button>
                        </div>
            </form>) : (<form onSubmit={handleSubmit}>
                    <div>
                      <p className="text-right">
                        <a href="#" onClick={() => switchToFields()} className="text-blue-600 text-sm" > Switch to Fields </a>
                      </p>
                    </div>
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-neutral-600 pb-2"
                    >
                      Address (free-form)
                      <p>Copy & paste the full address</p>
            
                    </label>
                    <div className="mb-4">
                      <textarea
                        id="addressfree"
                        name="addressfree"
                        rows={3}
                        required=""
                        placeholder="Full address"
                        className="
                            block
                            w-full
                            px-5
                            py-2
                            text-base
                            transition
                            duration-500
                            ease-in-out
                            transform
                            border border-gray-300
                            rounded-lg
                            text-neutral-600 
                        "
                          value={freeFormInput}
                          onChange={(e) => setFreeFormInput(e.target.value)}
                      />
                    </div>
                    </div>
                     <div>
                      <button type="submit" className="
                        flex
                        items-center
                        justify-center
                        w-full
                        px-10
                        py-4
                        text-base
                        font-medium
                        text-center text-white
                        transition
                        duration-500
                        ease-in-out
                        transform
                        bg-blue-600
                        rounded-lg
                        hover:bg-blue-700
                      "> Save Address </button>
                        </div>
                  </form>) }
              </div>
    )
}
 
