import React, { useState, useEffect } from "react";
import Select from "react-select";
import "./tagscreate.css";
// import { TfiPencilAlt } from "react-icons/tfi";
import { FiSettings } from "react-icons/fi";
import { CiMenuKebab } from "react-icons/ci";

const Tagcreate = () => {
  const updateTag = () => {};

  const [inputValue, setInputValue] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);

  const colors = ["#EE4B2B", "#FFAC1C", "#32CD32", "#008000", "#0000FF", "#BF40BF", "#F72798"];

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const handleInputChange = (inputValue) => {
    setInputValue(inputValue);
    const newOptions = generateOptions(inputValue);
    setOptions(newOptions);
  };

  const generateOptions = (inputValue) => {
    return colors.map((tagColour, index) => ({
      //   value: ${inputValue.toLowerCase()}-${index},
      value: `${inputValue.toLowerCase()}-${index}`,
      tagName: inputValue,
      tagColour: tagColour,
    }));
  };

  const handleSubmit = () => {
    if (selectedOption) {
      const { tagName: tagName, tagColour } = selectedOption;
      // console.log("Submitted name:", tagName);
      // console.log("Submitted color:", tagColour);

      // Send API data
      sendApiData(tagName, tagColour);
    }
    // console.log("Submitted data:", selectedOption);
  };

  const sendApiData = (tagName, tagColour) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      tagName: tagName,
      tagColour: tagColour,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://127.0.0.1:8080/common/tag/", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  };

  const handleClear = () => {
    setInputValue("");
    setSelectedOption(null);
    setOptions([]);
  };

  const [tags, setTags] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8080/common/tag/");
      const data = await response.json();
      setTags(data.tags);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <div className="input-with-color-dropdown-container">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <label>Name</label>
          <input type="text" value={inputValue} onChange={(e) => handleInputChange(e.target.value)} placeholder="Name" className="input-field" />
        </div>
        <div style={{ display: "flex" }}>
          <label>Color</label>
          <Select value={selectedOption} onChange={handleChange} options={options} placeholder="Select Tag" getOptionLabel={(option) => <div style={{ color: option.tagColour, backgroundColor: option.tagColour, color: "#fff", borderRadius: "10px", width: "70px", justifyContent: "center", textAlign: "center" }}>{option.tagName}</div>} getOptionValue={(option) => option.value} className="select-dropdown" />
        </div>
        <div>
          <button onClick={handleSubmit} className="submit-button">
            Submit
          </button>
          <button onClick={handleClear} className="clear-button">
            Clear
          </button>
        </div>
      </div>

      <div style={{ width: "50rem"}}>
        <h1>Tags Table</h1>
        <table style={{ width: "80rem" }}> 
        <thead>
            <tr>
              <th>Tag</th>
              <th>Accounts</th>
              <th>Archived accounts</th>
              <th>Pending tasks</th>
              <th>Completed tasks</th>
              <th>Pipelines</th>
              <th>
                <FiSettings />
              </th>
            </tr>
          </thead>
          <tbody>
            {tags.map((tag) => (
                <tr key={tag._id}>
                <td style={{ backgroundColor: tag.tagColour, color: "#fff", borderRadius: "50px",textAlign: "center", height: "3rem"}}>{tag.tagName}</td>
                <td>1</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>

                <td>
                  <button
                    onClick={() => {
                      updateTag(tag._id);
                    }}
                    style={{ marginLeft: "10px", background: "none", color: "black" }}
                    className="btn btn-success"
                  >
                    {" "}
                    <CiMenuKebab />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Tagcreate;
