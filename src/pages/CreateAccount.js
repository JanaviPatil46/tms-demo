import React from "react";
import { useState, useEffect } from "react";
import "../pages/createAcoount.css";
import Tag from "../component/Tag";
import TeamMember from "../component/AddTeamMember";
import AddFolderTemplate from "../component/AddFolderTemplate";
import axios from "axios";
import SlideButton from "../component/SlideButton";
import makeAnimated from "react-select/animated";
import { FiPlusCircle } from "react-icons/fi";
import { FaPlus, FaTrash, FaPaperPlane } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

//?icon
import Select from "react-select";
import { RxCross2 } from "react-icons/rx";
import { SlArrowLeft, SlArrowRight, SlQuestion } from "react-icons/sl";
//?icon stage 2
import { useNavigation } from "react";

import { FaPlusCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function CreateAccount({ handleAddAccount }) {
  const [currentStage, setCurrentStage] = useState(1);

  const nextStage = () => {
    setCurrentStage((prevStage) => prevStage + 1);
  };

  const prevStage = () => {
    setCurrentStage((prevStage) => prevStage - 1);
  };

  //todo header
  const [formStage, setFormStage] = useState("stage1");
  const [showAccountInfo, setShowAccountInfo] = useState(false);

  const handleFormStage = (option) => {
    setFormStage(option);
  };
  //todo stage individual
  const [clientType, setClientType] = useState("");
  const [accountName, setAccountName] = useState("");

  const [teamMember, SetTeamMember] = useState("");
  const [folderTemplate, SetFolderTemplate] = useState("");
  const [cCountry, SetCCountry] = useState("");
  const [cStreetAddress, SetCStreetAddress] = useState("");
  const [cStateProvince, SetCStateProvince] = useState("");
  const [cZipPostalCode, SetCZipPostalCode] = useState("");
  const [companyName, setComapnyName] = useState("");
  const [isIndividualEnabled, setIsIndividualEnabled] = useState(true);
  const [isCompanyEnabled, setIsCompanyEnabled] = useState(false);
  const navigate = useNavigate();

  const handleContentCheckboxChange = () => {
    setIsIndividualEnabled(!isIndividualEnabled);
    // Reset the state of the other checkbox when this one is checked

    setClientType("Individual");
    setIsCompanyEnabled(false);
  };

  const handleCompanyCheckboxChange = () => {
    setIsCompanyEnabled(!isCompanyEnabled);
    // Reset the state of the other checkbox when this one is checked
    setIsIndividualEnabled(false);

    setClientType("Company");
  };

  const handleClientTypeChange = (type) => {
    setClientType(type);
  };
  const handleAccountName = (event) => {
    setAccountName(event.target.value);
  };

  const handleCompanyName = (event) => {
    setComapnyName(event.target.value);
  };

  const handleAddTeamMember = (selectedOption) => {
    SetTeamMember(selectedOption);
  };
  const handleAddFolderTemplate = (selectedOption) => {
    SetFolderTemplate(selectedOption);
  };

  //tag  data====>
  // const valuesToSend = addTag.map(item => item.value);

  const [combinedValues, setCombinedValues] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const animatedComponents = makeAnimated();

  //country===>
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  // phone number======================================

  const [isPhoneNumberFormVisible, setIsPhoneNumberFormVisible] =
    useState(false);
  const [phoneNumbers, setPhoneNumbers] = useState([]);

  const togglePhoneNumberForm = () => {
    setIsPhoneNumberFormVisible(!isPhoneNumberFormVisible);
  };

  const addPhoneNumber = () => {
    setPhoneNumbers([phoneNumbers, ""]);
  };

  // const navigate = useNavigate();
  // const handleback = () => {
  //   navigate("/#");
  // };

  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries/states")
      .then((response) => response.json())
      .then((data) => {
        setCountries(data.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      const selectedCountryData = countries.find(
        (country) => country.name === selectedCountry
      );
      if (selectedCountryData) {
        setStates(selectedCountryData.states);
      }
    }
  }, [selectedCountry, countries]);
  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://68.251.138.236:8080/common/tag/");
      const data = await response.json();
      setTags(data.tags);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const options = tags.map((tag) => ({
    value: tag._id,
    label: tag.tagName,
    colour: tag.tagColour,

    customStyle: {
      backgroundColor: tag.tagColour,
      color: "#fff",
      paddingBottom: "5px",
      borderRadius: "15px",
      // width: "120px",
      width: "210px",
      // alignItems: "center",
      textAlign: "center",
      marginTop: "5px",
      marginBottom: "5px",
      height: "auto",
    },
  }));

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.data.customStyle.backgroundColor,
      color: state.data.customStyle.color,
      borderRadius: state.data.customStyle.borderRadius,
      width: state.data.customStyle.width,
      textAlign: state.data.customStyle.textAlign,
      marginBottom: state.data.customStyle.marginBottom,
      height: state.data.customStyle.height,
    }),
    multiValue: (provided, state) => ({
      ...provided,
      backgroundColor: state.data.customStyle.backgroundColor,
      color: state.data.customStyle.color,
      borderRadius: state.data.customStyle.borderRadius,
      width: state.data.customStyle.width,
      textAlign: state.data.customStyle.textAlign,
    }),
    multiValueLabel: (provided, state) => ({
      ...provided,
      color: state.data.customStyle.color,
      borderRadius: state.data.customStyle.borderRadius,
      width: state.data.customStyle.width,
      textAlign: state.data.customStyle.textAlign,
    }),
  };

  const handleTagChange = (selectedOptions) => {
    setSelectedTags(selectedOptions);

    // Map selected options to their values and send as an array
    const selectedValues = selectedOptions.map((option) => option.value);

    // Send selectedValues array to your backend
    console.log("Selected Values:", selectedValues);
    setCombinedValues(selectedValues);
  };

  const handlesubmitindivisual = () => {
    nextStage();
    nextStage();
  };

  //=============================================================
  //todo handle submit indivisual
  const handleSubmit = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      clientType: clientType,
      accountName: accountName,
      tags: combinedValues,
      teamMembers: "65c7272f5c720e5168273d3c",
      folderTemplate: "abc1234567",
      contacts: "65c5b9157581f8b0600e4d2d",
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://127.0.0.1:8080/admin/accountdetails/", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
    //todo contact
  };

  //fetchData check console
  // console.log(clientType);
  // console.log(accountName);
  // console.log(teamMember);
  // console.log(folderTemplate);

  // console.log(clientType);
  // console.log(accountName);
  // console.log(teamMember);
  // console.log(folderTemplate);

  //company
  const companysubmit = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      clientType: clientType,
      accountName: accountName,
      tags: combinedValues,
      teamMembers: "65c7272f5c720e5168273d3c",
      folderTemplate: "abc1234567",

      companyName: companyName,
      country: cCountry,
      streetAddress: cStreetAddress,
      state: cStateProvince,
      postalCode: cZipPostalCode,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://127.0.0.1:8080/admin/accountdetails/", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  };

  const [contacts, setContacts] = useState([
    {
      fname: "",
      mname: "",
      lname: "",
      contactName: "",
      companyName: "",
      note: "",
      email: "",
      phoneNumber: null,
      tags: null,
      country: "",
      streetAddress: "",
      city: "",
      stateProvince: "",
      zipPostalCode: null,
    },
  ]);
  const [submittedContacts, setSubmittedContacts] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleInputChange = (index, event) => {
    const newContacts = [...contacts];
    newContacts[index][event.target.name] = event.target.value;
    setContacts(newContacts);
  };

  const createAddAccouunt = () => {
    setCurrentStage(1);
    handleAddAccount();
    setSubmittedContacts([]);
    setContacts([
      ...contacts,
      {
        fname: "",
        mname: "",
        lname: "",
        contactName: "",
        companyName: "",
        note: "",
        email: "",
        phoneNumber: null,
        tags: null,
        country: "",
        streetAddress: "",
        city: "",
        stateProvince: "",
        zipPostalCode: null,
      },
    ]);
  };

  const handleAddContact = () => {
    setContacts([
      ...contacts,
      {
        fname: "",
        mname: "",
        lname: "",
        contactName: "",
        companyName: "",
        note: "",
        email: "",
        phoneNumber: null,
        tags: null,
        country: "",
        streetAddress: "",
        city: "",
        stateProvince: "",
        zipPostalCode: null,
      },
    ]);
  };

  const handleRemoveContact = (index) => {
    const newContacts = [...contacts];
    newContacts.splice(index, 1);
    setContacts(newContacts);
  };
  ///create Contact Multiple
  //  const [contacts, setContacts] = useState([]);
  const [emptyError, setEmptyError] = useState(false);

  useEffect(() => {
    // console.log("Contacts Array:", contacts);
  }, [contacts]); // Triggered whenever 'contacts' state changes

  const addContactInput = () => {
    if (
      contacts.length === 0 ||
      contacts.every((contact) => contact.value.trim() !== "")
    ) {
      const newId = contacts.length;
      const label =
        contacts.length === 0 ? "Primary Contact" : "Additional Contact";
      setContacts([...contacts, { id: newId, value: "", label }]);
      setEmptyError(false);
    } else {
      setEmptyError(true);
    }
  };

  const removeContactInput = (id) => {
    const filteredContacts = contacts.filter((contact) => contact.id !== id);
    setContacts(filteredContacts);
  };

  const handleChange = (value, id) => {
    const updatedContacts = contacts.map((contact) =>
      contact.id === id ? { ...contact, value } : contact
    );
    setContacts(updatedContacts);
  };

  const handleSubmitContact = (index) => {
    const updatedSubmittedContacts = [...submittedContacts, contacts[index]];

    setSubmittedContacts(updatedSubmittedContacts);
    setContacts([
      {
        fname: "",
        mname: "",
        lname: "",
        contactName: "",
        companyName: "",
        note: "",
        email: "",
        phoneNumber: null,
        tags: "",
        country: "",
        streetAddress: "",
        city: "",
        stateProvince: "",
        zipPostalCode: "",
      },
    ]);
    setFormSubmitted(true);
  };

  const handleRemoveSubmittedContact = (index) => {
    const updatedSubmittedContacts = [...submittedContacts];
    updatedSubmittedContacts.splice(index, 1);
    setSubmittedContacts(updatedSubmittedContacts);
  };

  const handleSendContact = (index) => {
    handleRemoveSubmittedContact(index);
    // Log data before removing the contact
    console.log("Sending contact:", submittedContacts[index]);

    let data = JSON.stringify(submittedContacts[index]);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://127.0.0.1:8080/common/contact/",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleRoleChange = (index, selectedOption) => {
    const newContacts = [...contacts];
    newContacts[index].tags = selectedOption;
    setContacts(newContacts);
  };
  const handleRefresh = () => {
    window.location.reload();
  };

  console.log(clientType);
  const renderCurrentStage = () => {
    switch (currentStage) {
      case 1:
        return (
          <>
            <div className="individual">
              <div className="clienttype_container col-12">
                <div className="title_client col-6">
                  <div style={{ display: "flex" }}>
                    <div>
                      <h3
                        style={{
                          fontSize: "14px",
                          fontFamily: "sans-serif",
                          fontWeight: "600",
                          color: "gray",
                        }}
                      >
                        Client type
                      </h3>
                    </div>
                    <div
                      style={{
                        marginLeft: "5px",
                        marginTop: "-1px",
                        color: "blue",
                      }}
                    >
                      <SlQuestion />
                    </div>
                  </div>

                  <div className="account_subtype">
                    <div className="individual_subtype">
                      <label
                        htmlFor="company_radio"
                        style={{
                          fontSize: "14px",
                          fontFamily: "sans-serif",
                          marginLeft: "5px",
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={isIndividualEnabled}
                          onChange={handleContentCheckboxChange}
                          style={{ marginRight: "10px" }}
                        />
                        Individual
                      </label>
                    </div>

                    <div
                      className="company_subtype"
                      style={{ marginLeft: "20px" }}
                    >
                      <label
                        htmlFor="company_radio"
                        style={{
                          fontSize: "14px",
                          fontFamily: "sans-serif",
                          marginLeft: "10px",
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={isCompanyEnabled}
                          onChange={handleCompanyCheckboxChange}
                          style={{ marginRight: "10px" }}
                        />
                        Company
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div></div>
            </div>
            <div>
              <br />

              {isIndividualEnabled && (
                <div>
                  {/* Content form */}
                  <div className="individualInfo" style={{ padding: "15px" }}>
                    <div>
                      <div>
                        <h3
                          style={{
                            fontSize: "14px",
                            fontFamily: "sans-serif",
                            fontWeight: "600",
                            color: "gray",
                          }}
                        >
                          Account Info
                        </h3>
                      </div>
                      <div
                        style={{
                          marginLeft: "90px",
                          marginTop: "-20px",
                          color: "blue",
                        }}
                      >
                        <SlQuestion />
                      </div>
                    </div>

                    <div>
                      <label className="label">Account Name:</label>
                      <input
                        style={{
                          border: "1px solid #ddd",
                          height: "40px",
                          borderRadius: "5px",
                        }}
                        className="col-12 input"
                        type="text"
                        name="name"
                        placeholder="first name"
                        onChange={handleAccountName}
                      />
                    </div>

                    <div>
                      <label className="label">Tags:</label>
                      <Select
                        options={options}
                        components={animatedComponents}
                        isMulti // Enable multi-select
                        value={selectedTags}
                        onChange={handleTagChange}
                        placeholder="Select tags..."
                        isSearchable // Enable search
                        styles={customStyles}
                      />
                    </div>
                    <div>
                      <label className="label">Team Member:</label>
                      <TeamMember addTeamMember={handleAddTeamMember} />
                    </div>
                    <div>
                      <label className="label">Folder Template :</label>
                      <AddFolderTemplate
                        addFolderTemplate={handleAddFolderTemplate}
                      />
                    </div>
                    <div>
                      <button
                        style={{ width: "24%" }}
                        className="submit-btn col-6"
                        onClick={() => {
                          handlesubmitindivisual();
                          handleFormStage("stage2");
                        }}
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {isCompanyEnabled && (
                <div>
                  {/* Company form */}
                  <div className="individualInfo" style={{ padding: "15px" }}>
                    <div>
                      <div>
                        <h3
                          style={{
                            fontSize: "14px",
                            fontFamily: "sans-serif",
                            fontWeight: "600",
                            color: "gray",
                          }}
                        >
                          Account Info
                        </h3>
                      </div>
                      <div
                        style={{
                          marginLeft: "90px",
                          marginTop: "-20px",
                          color: "blue",
                        }}
                      >
                        <SlQuestion />
                      </div>
                    </div>

                    <div>
                      <label className="label">Account Name:</label>
                      <input
                        style={{
                          border: "1px solid #ddd",
                          height: "40px",
                          borderRadius: "5px",
                        }}
                        className="col-12 input"
                        type="text"
                        name="name"
                        placeholder="first name"
                        onChange={handleAccountName}
                      />
                    </div>
                    <div>
                      <label className="label">Company Name:</label>
                      <input
                        style={{
                          border: "1px solid #ddd",
                          height: "40px",
                          borderRadius: "5px",
                        }}
                        className="col-12 input"
                        type="text"
                        name="name"
                        placeholder="company name"
                        onChange={handleCompanyName}
                      />
                    </div>

                    <div>
                      <label className="label">Tags:</label>
                      <Select
                        options={options}
                        components={animatedComponents}
                        isMulti // Enable multi-select
                        value={selectedTags}
                        onChange={handleTagChange}
                        placeholder="Select tags..."
                        isSearchable // Enable search
                        styles={customStyles}
                      />
                    </div>
                    <div>
                      <label className="label">Team Member:</label>
                      <TeamMember addTeamMember={handleAddTeamMember} />
                    </div>
                    <div>
                      <label className="label">Folder Template :</label>
                      <AddFolderTemplate
                        addFolderTemplate={handleAddFolderTemplate}
                      />
                    </div>
                    <div style={{ marginTop: "10px" }}>
                      <h5>Company Adress</h5>
                    </div>

                    <div className="col-12" style={{ padding: "10px" }}>
                      <label
                        style={{
                          fontSize: "14px",
                          color: "CaptionText",
                          fontFamily: "sans-serif",
                        }}
                      >
                        Country :
                      </label>
                      <select
                        type="text"
                        id="country"
                        value={cCountry}
                        onChange={(e) => SetCCountry(e.target.value)}
                        style={{
                          width: "100%",
                          boxSizing: "border-box",
                          border: "1px solid #ddd",
                          borderRadius: "5px",
                          height: "35px",
                        }}
                      >
                        <option value="">Select a country</option>
                        {countries.map((country) => (
                          <option key={country.name} value={country.name}>
                            {country.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="label">Street address::</label>
                      <input
                        style={{
                          border: "1px solid #ddd",
                          height: "40px",
                          borderRadius: "5px",
                        }}
                        className="col-12 input"
                        type="text"
                        name="name"
                        placeholder=""
                        onChange={(e) => SetCStreetAddress(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="label">State/Province:</label>
                      <input
                        style={{
                          border: "1px solid #ddd",
                          height: "40px",
                          borderRadius: "5px",
                        }}
                        className="col-12 input"
                        type="text"
                        name="name"
                        placeholder=""
                        onChange={(e) => SetCStateProvince(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="label">ZIP/Postal Code</label>
                      <input
                        style={{
                          border: "1px solid #ddd",
                          height: "40px",
                          borderRadius: "5px",
                        }}
                        className="col-12 input"
                        type="text"
                        name="name"
                        placeholder=""
                        onChange={(e) => SetCZipPostalCode(e.target.value)}
                      />
                    </div>

                    <div>
                      <button
                        style={{ width: "24%" }}
                        className="submit-btn col-6"
                        onClick={() => {
                          handlesubmitindivisual();
                          handleFormStage("stage2");
                        }}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div>add contct</div>
          </>
        );
      case 3:
        return (
          <div>
            {formSubmitted ? (
              <div>
                {submittedContacts.map((contact, index) => (
                  <div className=" col-12" key={index}>
                    <div style={{ marginLeft: "20px" }}>
                      <h6>Contact {index + 1} :</h6>
                      <h6>Name: {contact.fname}</h6>
                      <h6>Email: {contact.email}</h6>
                    </div>

                    <button
                      className="submit-btn col-6"
                      style={{
                        marginLeft: "10px",
                        width: "15%",
                        hight: "5px",
                        fontSize: "10px",
                      }}
                      onClick={() => handleRemoveSubmittedContact(index)}
                    >
                      Remove
                    </button>
                    <button
                      className="submit-btn col-6"
                      style={{
                        marginLeft: "10px",
                        width: "11%",
                        fontSize: "10px",
                      }}
                      onClick={() => handleSendContact(index)}
                    >
                      Send
                    </button>
                  </div>
                ))}

                <div className=" col-12">
                  <div className="addContact " style={{ margin: "20px" }}>
                    <div
                      className=" col-1"
                      style={{ color: "blue" }}
                      onClick={() => setFormSubmitted(false)}
                    >
                      <FaPlusCircle />
                    </div>
                    <div className=" col-11" style={{ marginLeft: "2px" }}>
                      <h5> Add New Contact</h5>
                    </div>
                  </div>
                  <div className="col-12">
                    <button
                      className="submit-btn col-12"
                      style={{
                        marginLeft: "10px",
                        width: "150px",
                        marginBottom: "10px",
                      }}
                      onClick={createAddAccouunt}
                    >
                      Create Account
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <form>
                  {contacts.map((contact, index) => (
                    <div key={index}>
                      <div
                        className="dynamicContact"
                        style={{ padding: "0 10px 0 10px" }}
                      >
                        <div
                          className=" col-12"
                          style={{ padding: "0 10px 0 10px" }}
                        >
                          <h5>Info:</h5>
                        </div>
                        <div
                          className=" col-4"
                          style={{ padding: "0 10px 0 10px" }}
                        >
                          <label
                            style={{ fontSize: "15px" }}
                            htmlFor={`fname${index}`}
                          >
                            First Name:
                          </label>
                          <input
                            style={{
                              display: "flex",
                              border: "1px solid #ddd",
                              height: "35px",
                              borderRadius: "5px",
                            }}
                            className="col-4 input"
                            type="text"
                            name="fname"
                            id={`fname${index}`}
                            value={contact.fname}
                            onChange={(e) => handleInputChange(index, e)}
                          />
                        </div>
                        <div
                          className=" col-4"
                          style={{ padding: "0 10px 0 10px" }}
                        >
                          <label
                            style={{ fontSize: "15px" }}
                            htmlFor={`mname${index}`}
                          >
                            Middle Name:
                          </label>
                          <input
                            style={{
                              display: "flex",
                              border: "1px solid #ddd",
                              height: "35px",
                              borderRadius: "5px",
                            }}
                            className="col-4 input"
                            type="text"
                            name="mname"
                            id={`mname${index}`}
                            value={contact.mname}
                            onChange={(e) => handleInputChange(index, e)}
                          />
                        </div>
                        <div
                          className=" col-4"
                          style={{ padding: "0 10px 0 10px" }}
                        >
                          <label
                            style={{ fontSize: "15px" }}
                            htmlFor={`lname${index}`}
                          >
                            Last Name:
                          </label>
                          <input
                            style={{
                              display: "flex",
                              border: "1px solid #ddd",
                              height: "35px",
                              borderRadius: "5px",
                            }}
                            className="col-4 input"
                            type="text"
                            name="lname"
                            id={`lname${index}`}
                            value={contact.lname}
                            onChange={(e) => handleInputChange(index, e)}
                          />
                        </div>
                        <div
                          className=" col-12"
                          style={{ padding: "0 10px 0 10px" }}
                        >
                          <label
                            style={{ fontSize: "15px" }}
                            htmlFor={`contactName${index}`}
                          >
                            Contact Name:
                          </label>
                          <input
                            style={{
                              display: "flex",
                              border: "1px solid #ddd",
                              height: "35px",
                              borderRadius: "5px",
                            }}
                            className="col-4 input"
                            type="text"
                            name="contactName"
                            id={`contactName${index}`}
                            value={contact.contactName}
                            onChange={(e) => handleInputChange(index, e)}
                          />
                        </div>
                        <div
                          className=" col-12"
                          style={{ padding: "0 10px 0 10px " }}
                        >
                          <label
                            style={{ fontSize: "15px" }}
                            htmlFor={`companyName${index}`}
                          >
                            Company Name:
                          </label>
                          <input
                            style={{
                              display: "flex",
                              border: "1px solid #ddd",
                              height: "35px",
                              borderRadius: "5px",
                            }}
                            className="col-4 input"
                            type="text"
                            name="companyName"
                            id={`companyName${index}`}
                            value={contact.companyName}
                            onChange={(e) => handleInputChange(index, e)}
                          />
                        </div>
                        <div
                          className=" col-12"
                          style={{ padding: "0 10px 0 10px " }}
                        >
                          <label
                            style={{ fontSize: "15px" }}
                            htmlFor={`note${index}`}
                          >
                            Note:
                          </label>
                          <input
                            style={{
                              display: "flex",
                              border: "1px solid #ddd",
                              height: "35px",
                              borderRadius: "5px",
                            }}
                            className="col-4 input"
                            type="text"
                            name="note"
                            id={`note${index}`}
                            value={contact.note}
                            onChange={(e) => handleInputChange(index, e)}
                          />
                        </div>
                        <div
                          className=" col-12"
                          style={{ padding: "0 10px 10px 10px" }}
                        >
                          <label
                            style={{ fontSize: "15px" }}
                            htmlFor={`email${index}`}
                          >
                            Email:
                          </label>
                          <input
                            style={{
                              display: "flex",
                              border: "1px solid #ddd",
                              height: "35px",
                              borderRadius: "5px",
                            }}
                            className="col-4 input"
                            type="email"
                            name="email"
                            id={`email${index}`}
                            value={contact.email}
                            onChange={(e) => handleInputChange(index, e)}
                          />
                        </div>
                        <div
                          className="btnSlide col-12"
                          style={{ padding: "0 6% 0 10% " }}
                        >
                          <div className="col-2" style={{ width: "15%" }}>
                            <SlideButton />
                          </div>
                          <div className=" col-2">
                            <label style={{ fontSize: "12px", color: "black" }}>
                              Login
                            </label>
                          </div>
                          <div className="col-2" style={{ width: "15%" }}>
                            <SlideButton />
                          </div>
                          <div className=" col-2">
                            <label style={{ fontSize: "12px", color: "black" }}>
                              Notify
                            </label>
                          </div>
                          <div className="col-2" style={{ width: "15%" }}>
                            <SlideButton />
                          </div>
                          <div className=" col-2">
                            <label style={{ fontSize: "12px", color: "black" }}>
                              Email Sync
                            </label>
                          </div>
                        </div>

                        <div
                          className=" col-12"
                          style={{ padding: "0 10px 10px 10px" }}
                        >
                          <label style={{ fontSize: "15px" }}>Tags:</label>
                          <Select
                            options={options}
                            components={animatedComponents}
                            isMulti // Enable multi-select
                            value={selectedTags}
                            onChange={handleTagChange}
                            placeholder="Select tags..."
                            isSearchable // Enable search
                            styles={customStyles}
                          />
                        </div>
                        <div
                          className=" col-12"
                          style={{ padding: "0 10px 0 10px" }}
                        >
                          <h5>Phone Number</h5>
                        </div>

   
<div
  className="col-12"
  style={{
    display: "flex",
    marginTop: "5%",
    color: "rgb(58, 145, 245)",
  }}
>
  <FiPlusCircle onClick={addContactInput} />
  <h6>Add Phone numbers</h6>
</div>

<div className="contact-create">
  {contacts.map((contact) => (
    <div key={contact.id} className="contact-item">
      <label className="contact-label">
        {contact.label}:
        <PhoneInput
          country={"in"}
          value={contact.value}
          onChange={(value) => handleChange(value, contact.id)}
          inputProps={{
            required: true,
            className: "phone-input",
          }}
        />
        <FaTrash
          className="remove-button-phone"
          onClick={() => removeContactInput(contact.id)}
        />
      </label>
    </div>
  ))}
</div>

                        {/* <div
                          className=" col-12"
                          style={{ padding: "0 10px 0 10px " }}
                          

                        >
                          <input
                            style={{
                              display: "flex",
                              border: "1px solid #ddd",
                              height: "35px",
                              borderRadius: "5px",
                            }}
                            className="col-4 input"
                            type="text"
                            name="phoneNumber"
                            id={phoneNumber${index}}
                            value={contact.phoneNumber}
                            onChange={(e) => handleInputChange(index, e)}
                          />
                        </div> */}
                        <div
                          className=" col-12"
                          style={{ padding: "0 10px 0 10px" }}
                        >
                          <h5>Address:</h5>
                        </div>

                        <div className="col-12" style={{ padding: "10px" }}>
                          <label
                            style={{
                              fontSize: "14px",
                              color: "CaptionText",
                              fontFamily: "sans-serif",
                            }}
                          >
                            Country :
                          </label>
                          <select
                            type="text"
                            id={`country${index}`}
                            onChange={(e) => handleInputChange(index, e)}
                            style={{
                              width: "100%",
                              boxSizing: "border-box",
                              border: "1px solid #ddd",
                              borderRadius: "5px",
                              height: "35px",
                            }}
                          >
                            <option value="">Select a country</option>
                            {countries.map((country) => (
                              <option key={country.name} value={country.name}>
                                {country.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div
                          className=" col-12"
                          style={{ padding: "0 10px 0 10px " }}
                        >
                          <label
                            style={{ fontSize: "15px" }}
                            htmlFor={`streetAddress${index}`}
                          >
                            Street address:
                          </label>
                          <input
                            style={{
                              display: "flex",
                              border: "1px solid #ddd",
                              height: "35px",
                              borderRadius: "5px",
                            }}
                            className="col-4 input"
                            type="text"
                            name="streetAddress"
                            id={`streetAddress${index}`}
                            value={contact.streetAddress}
                            onChange={(e) => handleInputChange(index, e)}
                          />
                        </div>
                        <div
                          className=" col-4"
                          style={{ padding: "0 10px 0 10px" }}
                        >
                          <label
                            style={{ fontSize: "15px" }}
                            htmlFor={`city${index}`}
                          >
                            City:
                          </label>
                          <input
                            style={{
                              display: "flex",
                              border: "1px solid #ddd",
                              height: "35px",
                              borderRadius: "5px",
                            }}
                            className="col-4 input"
                            type="text"
                            name="city"
                            id={`city${index}`}
                            value={contact.city}
                            onChange={(e) => handleInputChange(index, e)}
                          />
                        </div>
                        <div
                          className=" col-4"
                          style={{ padding: "0 10px 0 10px" }}
                        >
                          <label
                            style={{ fontSize: "15px" }}
                            htmlFor={`stateProvince${index}`}
                          >
                            State/Province:
                          </label>
                          <input
                            style={{
                              display: "flex",
                              border: "1px solid #ddd",
                              height: "35px",
                              borderRadius: "5px",
                            }}
                            className="col-4 input"
                            type="text"
                            name="stateProvince"
                            id={`stateProvince${index}`}
                            value={contact.stateProvince}
                            onChange={(e) => handleInputChange(index, e)}
                          />
                        </div>
                        <div
                          className=" col-4"
                          style={{ padding: "0 10px 0 10px" }}
                        >
                          <label
                            style={{ fontSize: "15px" }}
                            htmlFor={`zipPostalCode${index}`}
                          >
                            ZIP/Postal Code
                          </label>
                          <input
                            style={{
                              display: "flex",
                              border: "1px solid #ddd",
                              height: "35px",
                              borderRadius: "5px",
                            }}
                            className="col-4 input"
                            type="number"
                            name="zipPostalCode"
                            id={`zipPostalCode${index}`}
                            value={contact.zipPostalCode}
                            onChange={(e) => handleInputChange(index, e)}
                          />
                        </div>
                        <div className=" col-12">
                          <hr />
                        </div>
                      </div>

                      <button
                        className="submit-btn col-6"
                        style={{ marginLeft: "10px", width: "24%" }}
                        onClick={() => {
                          handleSubmitContact(index);
                        }}
                      >
                        Submit
                      </button>
                    </div>
                  ))}
                </form>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div>
        <div className="account-header col-12">
          <h3 className="account_title">New Account</h3>
          <button className="header-button">
            <RxCross2
              style={{ display: "flex", flexWrap: "wrap" }}
              onClick={() => handleAddAccount()}
            />
          </button>

          <div className="accounttype_container col-12">
            <div className="sub-account col-6">
              <div
                className=" col-4"
                style={{
                  fontWeight: formStage === "stage1" ? "bold" : "normal",
                }}
              >
                <input
                  type="radio"
                  id="account_info_radio"
                  name="account_info_radio"
                  checked={formStage === "stage1"}
                />
                <label
                  htmlFor="account_info_radio"
                  style={{ marginLeft: "-30px", fontSize: "10px" }}
                >
                  Account info
                </label>
                {showAccountInfo && <span>1</span>}
              </div>
              <div className="rotate-btn col-4">
                {formStage === "stage1" ? <SlArrowRight /> : <SlArrowLeft />}
              </div>
              <div
                className=" col-4"
                style={{
                  fontWeight: formStage === "stage2" ? "normal" : "bold",
                }}
              >
                <input
                  type="radio"
                  id="company_info_radio"
                  name="company_info_radio"
                  checked={formStage === "stage2"}
                  style={{
                    width: "13px",
                    background: formStage === "stage2" ? "green" : "blue",
                  }}
                />
                <label
                  htmlFor="company_info_radio"
                  style={{ marginLeft: "-23px", fontSize: "10px" }}
                >
                  Contacts
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {renderCurrentStage()}

      {/* <div className="col-12">
        {currentStage > 1 && <button onClick={prevStage}>Previous</button>}
        {currentStage < 3 && <button onClick={nextStage}>Next</button>}
      </div> */}
    </div>
  );
}

export default CreateAccount;
// companysubmit()
// handleSubmit()