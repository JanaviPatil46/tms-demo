import React, { useState, useEffect } from "react";
import accounts from "./AccountDumy";
import "./accountsdata.css";
import { RiDeleteBin5Line } from "react-icons/ri";
import { LuPlusCircle } from "react-icons/lu";
const AccountsData = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://127.0.0.1:8080/common/contact/contactlist/list/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.contactlist);
        setContacts(result.contactlist);
      })
      .catch((error) => console.error(error));
  }, []);

  const itemsPerPage = 10; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total number of pages
  const totalPages = Math.ceil(contacts.length / itemsPerPage);

  // Calculate index range for current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, contacts.length);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Function to handle next page
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Function to handle previous page
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };


  //delete template
  const handleDelete = (_id) => {

    console.log(_id)

    const requestOptions = {
      method: "DELETE",
      redirect: "follow"
    };

    fetch("http://127.0.0.1:8080/common/contact/" + _id, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete item');
        }
        return response.text();
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error(error);

      })
      .finally(() => {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      });
  };

  // Handler function to toggle selection of a contact
  const handleCheckboxChange = (id) => {
    setSelectedContacts((prevSelectedContacts) => {
      if (prevSelectedContacts.includes(id)) {
        // If the ID is already in the selectedContacts array, remove it
        return prevSelectedContacts.filter((contactId) => contactId !== id);
      } else {
        // Otherwise, add the ID to the selectedContacts array
        return [...prevSelectedContacts, id];
      }
    });
  };


console.log(selectedContacts)









  return (





    <div style={{ padding: "20px" }}>
      <span style={{ color: 'blue', cursor: "pointer" }} >
        <LuPlusCircle />  Filter </span>
      <table className="my-table col-12 ">

        <thead>
          <tr>
            <th></th> {/* Empty header for checkbox */}
            <th>NAME</th>
            <th>EMAIL</th>
            <th>PHONE NUMBER</th>
            <th>COMPANY NAME</th>
            <th>TAGS</th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {contacts && contacts.map((contact) => (
            <tr key={contact.id}>
              <td>
                <input type="checkbox"
                 checked={selectedContacts.includes(contact.id)}  
                 onChange={() => handleCheckboxChange(contact.id)} />

              </td> {/* Checkbox column */}
              <td>{contact.Name}</td>
              <td>{contact.Email}</td>
              <td>
                {contact.phoneNumber ? (
                  contact.phoneNumber.map((number, index) => (
                    <div key={index}>{number.phoneNumber}</div>
                  ))
                ) : (
                  <span> </span>
                )}
              </td>
              <td>{contact.companyName}</td>

              <td>
                {contact.Tags && contact.Tags.map(tagArray => (
                  <div key={tagArray[0]._id}>
                    {tagArray.map(tag => (
                      <h5 key={tag._id} style={{ backgroundColor: tag.tagColour, color: "#fff", borderRadius: "50px", textAlign: "center", marginBottom: '5px', }}>
                        {tag.tagName}
                      </h5>
                    ))}
                  </div>
                ))}
              </td>
              <td style={{ color: "red" }}> <RiDeleteBin5Line onClick={(txt) => handleDelete(contact.id)} /> </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          {" "}
          Page {currentPage} of {totalPages}{" "}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>

  );
};

export default AccountsData;
