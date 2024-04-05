import React, { useState, useRef, useEffect } from "react";
import accounts from "./AccountDumy";
import "./accountsdata.css";
import { RiAddCircleLine } from 'react-icons/ri';

import { IoIosCloseCircleOutline } from "react-icons/io";

const AccountsData = () => {
  const [acc, setAccounts] = useState([]);
  const [selectedAccounts, setSelectedAccounts] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [filter, setFilter] = useState('');

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


  const handleCheckboxChange = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      // If selectAll is false, set all accounts as selected
      const allAccountIds = acc.map(account => account.id);
      console.log(allAccountIds)
      setSelectedAccounts(allAccountIds);
    } else {
      // If selectAll is true, deselect all accounts
      setSelectedAccounts([]);
    }
  };

  const handleRecordCheckboxChange = (accountId) => {
    // Toggle selection for individual accounts
    if (selectedAccounts.includes(accountId)) {
      setSelectedAccounts(selectedAccounts.filter(id => id !== accountId));
    } else {
      setSelectedAccounts([...selectedAccounts, accountId]);
    }
  };

  console.log(selectedAccounts)


  // Filter function
  // Function to get unique values from a specific column
  function getUniqueValues(columnName) {
    return [...new Set(acc.map(item => item[columnName]))];
  }
  // Example of getting unique values from the 'Type' column
  const uniqueTypeValues = getUniqueValues('Type');


  // Function to get unique values from a specific column
  function getUniqueTagValues(columnName) {
    return [...new Set(acc.map(item => item[columnName]))];
  }
  // Example of getting unique values from the 'Type' column
  const uniqueTagValues = getUniqueTagValues('Tags');

  console.log(uniqueTagValues)
  console.log(uniqueTypeValues)

  const filteredAccounts = acc.filter((account) => {
    return Object.values(account).some((value) => {
      if (typeof value === 'string') {
        return value.toLowerCase().includes(filter.toLowerCase());
      }
      return false;
    });
  });

  let tagValues = [];
  console.log(tagValues);

  //Filter Funtionality
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);
  const [filteredShortcuts, setFilteredShortcuts] = useState([]);
  const [inputText, setInputText] = useState('');
  const [showDropdownhtml, setShowDropdownhtml] = useState(false);
  const [shortcuts, setShortcuts] = useState([]);
  const [selectedOption, setSelectedOption] = useState(); // Default selected option
  const [uniqueTags, setUniqueTags] = useState([]);

  // Define your shortcut options here

  useEffect(() => {
    setFilteredShortcuts(shortcuts.filter(shortcut => shortcut.title.toLowerCase().includes(searchTerm.toLowerCase())));
  }, [searchTerm, shortcuts]);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
    setSearchTerm(''); // Clear search term when showing the dropdown
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddShortcut = (shortcut) => {

    console.log(shortcut)
    if (shortcut === "Type") {
      setShowSelect(true);
    } else if (shortcut === "Tags") {
      setUniqueTags(getUniqueTagValues('Tags'));
      setFilter('')
      setShowSelect(true);
    }

  };

  useEffect(() => {
    // Set contact shortcuts
    const FilterList = [
      { title: 'Client Type', isBold: false, value: 'Type' },
      { title: 'Tags', isBold: false, value: 'Tags' },
    ]
    setShortcuts(FilterList);

  }, [selectedOption]);

  const [showSelect, setShowSelect] = useState(false);


  return (
    <div style={{ padding: "20px", }}>
      <div style={{ marginRight: "900px" }}>
        <button style={{ background: "none" }} type="button" className="btn  add-shortcut-button" onClick={toggleDropdown}>
          <RiAddCircleLine className="add-shortcut-icon" /> Filter
        </button>
        {showSelect ? (
          <select style={{ marginTop: "10px", width: "120px" }}   onChange={(e) => setFilter(e.target.value)}>
            <option value="">All Types</option>   
            {/* Unique type options */}
            {getUniqueValues('Type').map(type => (
              <option key={type} value={type}>{type}</option>
              
            ))}
          
          </select>
        ) : (
          <select style={{ marginTop: "40px" }}>
            <option value="">All Tags</option>
            {/* Unique tag options */}
            {uniqueTags.map((tag, index) => (
              <option key={index} value={tag}>{tag}</option>
            ))}
          </select>
        )}

        {/* <button style={{ background : "none" }} type="button" className="btn  add-shortcut-button" onClick={toggleDropdown}>
                                <RiAddCircleLine className="add-shortcut-icon" /> Filter
                            </button>    */}
        {showDropdown && (
          <div className="dropdown" ref={dropdownRef}>
            <div className="search-bar" >
              <input
                type="text"
                placeholder="Search shortcuts"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <button className="close-icon" style={{ fontSize: "20px", marginTop: '4px' }} onClick={toggleDropdown}>
                <IoIosCloseCircleOutline />
              </button>
            </div>
            <ul className="dropdown-list">
              {filteredShortcuts.map(shortcut => (
                <div key={shortcut.title}>
                  <span
                    style={{ fontWeight: shortcut.isBold ? 'bold' : 'normal', cursor: 'pointer' }}
                    onClick={() => handleAddShortcut(shortcut.value)}>
                    {shortcut.title}
                  </span>
                </div>
              ))}
            </ul>
          </div>
        )}




      </div>

      <div style={{ position: "relative", textAlign: "right" }}>
        <input
          className="searchText"
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Search"
          style={{ width: "25%", height: "10px", padding: "15px 10px", borderRadius: "20px" }}
        />
      </div>

      <table className="my-table col-12 ">
        <thead>
          <tr>
            <th> <input type="checkbox" checked={selectAll}
              onChange={handleCheckboxChange} /></th> {/* Empty header for checkbox */}
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

          {(filteredAccounts.length > 0 ? filteredAccounts : acc).map((account) => {
            // Check if the account matches the filter criteria
            const matchesFilter =
              account.Name.toLowerCase().includes(filter.toLowerCase()) ||
              account.Follow.toLowerCase().includes(filter.toLowerCase()) ||
              account.Type.toLowerCase().includes(filter.toLowerCase()) ||
              account.Invoices.toLowerCase().includes(filter.toLowerCase()) ||
              account.Credits.toLowerCase().includes(filter.toLowerCase()) ||
              account.Tasks.toLowerCase().includes(filter.toLowerCase()) ||
              account.Team.toLowerCase().includes(filter.toLowerCase()) ||
              account.Proposals.toLowerCase().includes(filter.toLowerCase()) ||
              account.Unreadchats.toLowerCase().includes(filter.toLowerCase()) ||
              account.Pendingorganizers.toLowerCase().includes(filter.toLowerCase()) ||
              account.Pendingsignatures.toLowerCase().includes(filter.toLowerCase()) ||
              account.Lastlogin.toLowerCase().includes(filter.toLowerCase()) ||
              (account.Tags &&
                account.Tags.some(
                  (tag) =>
                    tag.tagName.toLowerCase().includes(filter.toLowerCase()) ||
                    tag.tagColour.toLowerCase().includes(filter.toLowerCase())
                ));

            // Render the row only if it matches the filter criteria
            if (matchesFilter) {
              return (
                <tr key={account.id}>
                  <td>
                    <input type="checkbox"
                      checked={selectedAccounts.includes(account.id)}
                      onChange={() => handleRecordCheckboxChange(account.id)} />
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
              );
            } else {
              return null; // Don't render the row if it doesn't match the filter criteria
            }
          })}
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
