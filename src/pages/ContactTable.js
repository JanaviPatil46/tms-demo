// import React, { useState } from "react";
// import accounts from "./AccountDumy";
// import "./accountsdata.css";

// const ContactTable = () => {
//   const itemsPerPage = 3; // Number of items per page
//   const [currentPage, setCurrentPage] = useState(1);

//   // Calculate total number of pages
//   const totalPages = Math.ceil(accounts.length / itemsPerPage);

//   // Calculate index range for current page
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = Math.min(startIndex + itemsPerPage, accounts.length);

//   // Function to handle page change
//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   // Function to handle next page
//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   // Function to handle previous page
//   const handlePreviousPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <table className="my-table col-12 ">
//         <thead>
//           <tr>
//             <th>N</th>
//             <th>Type</th>
//             <th>Invoice</th>
//             <th>Credits</th>
//             <th>Tasks</th>
//             <th>Team</th>
//             <th>Tags</th>
//             <th>Proposals</th>
//             <th>Unread</th>
//             <th>Chats</th>
//             <th>Pending</th>
//           </tr>
//         </thead>
//         <tbody>
//           {accounts.slice(startIndex, endIndex).map((account) => (
//             <tr key={account.id}>
//               <td>{account.name}</td>
//               <td>{account.type}</td>
//               <td>{account.invoice}</td>
//               <td>{account.credits}</td>
//               <td>{account.tasks}</td>
//               <td>{account.team}</td>
//               <td>{account.tags}</td>
//               <td>{account.proposals}</td>
//               <td>{account.unread}</td>
//               <td>{account.chats}</td>
//               <td>{account.pending}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Pagination */}
//       <div>
//         <button onClick={handlePreviousPage} disabled={currentPage === 1}>
//           Previous
//         </button>
//         <span>
//           {" "}
//           Page {currentPage} of {totalPages}{" "}
//         </span>
//         <button onClick={handleNextPage} disabled={currentPage === totalPages}>
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ContactTable;

import React, { useState, useEffect } from "react";
import accounts from "./AccountDumy";
import "./accountsdata.css";
const AccountsData = () => {
  const [acc, setAccounts] = useState([]);

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://68.251.138.236:8080/common/contact/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.contacts);
        setAccounts(result.contacts);
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

  let tagValues = [];
  console.log(tagValues);

  return (
    <div style={{ padding: "20px" }}>
      <table className="my-table col-12 ">
        <thead>
          <tr>
            <th>Name</th>
            <th>Company Name</th>
            <th>Tag</th>

            {/* <th>Tasks</th>
            <th>Team</th>
            <th>Tags</th>
            <th>Proposals</th>
            <th>Unread</th>
            <th>Chats</th>
            <th>Pending</th> */}
          </tr>
        </thead>
        <tbody>
          {acc.map((account) => (
            <tr key={account._id}>
              <td>{account.contactName}</td>
              <td>{account.companyName}</td>
              {/* <td className="col-6" style={{ backgroundColor: tag.tagColour, color: "#fff", borderRadius: "10px" }}>
                  {tag.tagName}
                </td> */}

              {/* {account.tags.map((tag) => {
                tagValues.push(tag.tag);
                return <td>{tag.tag}</td>;
              })} */}


              {account.tags && account.tags.map(tag => (
                <li key={tag._id}>{tag.tagName}</li>
              ))}

              <td>{account.folderTemplate}</td>
              {/* <td>{account.credits}</td>
              <td>{account.tasks}</td>
              <td>{account.team}</td>
              <td>{account.tags}</td>
              <td>{account.proposals}</td>
              <td>{account.unread}</td>
              <td>{account.chats}</td>
              <td>{account.pending}</td> */}
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
