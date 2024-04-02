import React, { useState, useEffect } from "react";
import accounts from "./AccountDumy";
import "./accountsdata.css";
const AccountsData = () => {
  const [acc, setAccounts] = useState([]);
  const [selectedAccounts, setSelectedAccounts] = useState([]);


  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://127.0.0.1:8080/admin/account/accountdetailslist/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.accountlist);
        setAccounts(result.accountlist);
      })
      .catch((error) => console.error(error));
  }, []);

  const itemsPerPage = 3; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total number of pages
  const totalPages = Math.ceil(accounts.length / itemsPerPage);

  // Calculate index range for current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, accounts.length);

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

  const [tags, setTags] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://68.251.138.236:8080/common/tag?=" + tagValues);
      const data = await response.json();
      setTags(data.tags);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


   // Handler function to toggle selection of a contact
  const handleCheckboxChange = (id) => {
    setSelectedAccounts((prevSelectedContacts) => {
      if (prevSelectedContacts.includes(id)) {
        // If the ID is already in the selectedContacts array, remove it
        return prevSelectedContacts.filter((accountid) => accountid !== id);
      } else {
        // Otherwise, add the ID to the selectedContacts array
        return [...prevSelectedContacts, id];
      }
    });
  };

  console.log(selectedAccounts)

  let tagValues = [];
  console.log(tagValues);






  return (
    <div style={{ padding: "20px" }}>
      <table className="my-table col-12 ">
        <thead>
          <tr>
            <th></th> {/* Empty header for checkbox */}
            <th>Name</th>
            <th>Follow</th>
            <th>Type</th>
            <th>Invoices</th>
            <th>Credits</th>
            <th>Tasks</th>
            <th>Team</th>
            <th>Tags</th>
            <th>Proposals</th>
            <th>Unread Chats</th>
            <th>Pending Organizers</th>
            <th>Pending Signature</th>
            <th>Last Login</th>
            <th>Settings</th>
          </tr>
        </thead>
        <tbody>
          {acc.map((account) => (
            <tr key={account.id}>
               <td>
                <input type="checkbox"
                 checked={selectedAccounts.includes(account.id)}  
                 onChange={() => handleCheckboxChange(account.id)} />

              </td> {/* Checkbox column */}
              <td>{account.Name}</td>
              <td>{account.Follow}</td>
              <td>{account.Type}</td>
              <td>{account.Invoices}</td>
              <td>{account.Credits}</td>
              <td>{account.Tasks}</td>
              <td>{account.Team}</td>

              {account.Tags && account.Tags.map(tag => (
                <h5 style={{ backgroundColor: tag.tagColour, color: "#fff", borderRadius: "50px", textAlign: "center", marginBottom: '5px', }}>{tag.tagName}</h5>
              ))}

              <td>{account.Proposals}</td>
              <td>{account.Unreadchats}</td>
              <td>{account.Pendingorganizers}</td>
              <td>{account.Pendingsignatures}</td>
              <td>{account.Lastlogin}</td>
              <td> </td>
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
