import React, { useState, useEffect } from "react";
import accounts from "./AccountDumy";
import "./jobdata.css";
import { toast, ToastContainer } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router-dom';

import { RiErrorWarningLine } from "react-icons/ri";

const JobsData = () => {
  const navigate = useNavigate();
  const [job, setJobs] = useState([]);

  const [selectedJobs, setSelectedJobs] = useState([]);

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://127.0.0.1:8080/workflow/job/joblist/list/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setJobs(result.jobList);
      })
      .catch((error) => console.error(error));
  }, []);

  const itemsPerPage = 10; // Number of items per page
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


  const handleEdit = (_id) => {
    // Implement logic for editing here
    // console.log("Edit action triggered for template id: ", templateId);
    navigate('AddJobs/' + _id)
  };

  const [openMenuId, setOpenMenuId] = useState(null);
  const toggleMenu = (_id) => {
    setOpenMenuId(openMenuId === _id ? null : _id);
  };




  //delete template
  const handleDelete = (_id) => {

    console.log(_id)

    const requestOptions = {
      method: "DELETE",
      redirect: "follow"
    };

    fetch("http://127.0.0.1:8080/workflow/job/" + _id, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete item');
        }
        return response.text();
      })
      .then((result) => {
        console.log(result);
        toast.success('Item deleted successfully');
      })
      .catch((error) => {
        console.error(error);
        toast.error('Failed to delete item');
      })
      .finally(() => {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      });
  };


  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const options = { month: 'short', day: '2-digit', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

   // Handler function to toggle selection of a contact
   const handleCheckboxChange = (id) => {
    setSelectedJobs((prevSelectedContacts) => {
      if (prevSelectedContacts.includes(id)) {
        // If the ID is already in the selectedContacts array, remove it
        return prevSelectedContacts.filter((jobId) => jobId !== id);
      } else {
        // Otherwise, add the ID to the selectedContacts array
        return [...prevSelectedContacts, id];
      }
    });
  };


console.log(selectedJobs)



  return (

    <div style={{ padding: "20px" }}>
      <table className="my-table col-12 ">
        <thead>
          <tr>
          <th></th>
            <th>Name</th>
            <th>JOB ASSIGNEE</th>
            <th>PIPELINE</th>
            <th>STAGE</th>
            <th>ACCOUNT</th>
            <th>START DATE</th>
            <th>DUE DATE</th>
            <th>TIME IN CURRENT</th>

          </tr>
        </thead>
        <tbody>
          {job.slice(startIndex, endIndex).map((job) => {
            console.log(job)
            // Check if createdAt exists and is not empty
            if (job.createdAt) {

              // Extract the date part from createdAt
              const createdAtDate = job.createdAt.split('T')[0];
              const startDateFormatted = formatDate(job.StartDate);
              const dueDateFormatted = formatDate(job.DueDate);

              // Calculate time difference
              const startDateParts = createdAtDate.split('-'); // Assuming date format is YYYY-MM-DD
              const startDate = new Date(startDateParts[0], startDateParts[1] - 1, startDateParts[2]); // Subtract 1 from month as it's 0-indexed


              const currentDate = new Date();
              const timeDiff = Math.abs(currentDate - startDate);
              const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Convert milliseconds to days

              // Convert days difference to human-readable format
              let timeInCurrent = '';
              if (daysDiff >= 365) {
                const years = Math.floor(daysDiff / 365);
                timeInCurrent = years === 1 ? 'a year' : `${years} years`;
              } else if (daysDiff >= 30) {
                const months = Math.floor(daysDiff / 30);
                timeInCurrent = months === 1 ? 'a month' : `${months} months`;
              } else if (daysDiff >= 7) {
                const weeks = Math.floor(daysDiff / 7);
                timeInCurrent = weeks === 1 ? 'a week' : `${weeks} weeks`;
              } else {
                timeInCurrent = daysDiff === 1 ? 'a day' : `${daysDiff} days`;
              }

              // Check if due date is provided and if it's overdue
              const isOverdue = dueDateFormatted && currentDate > new Date(dueDateFormatted);

              return (
                
                <tr key={job._id}>
                    <td>
                <input type="checkbox"
                 checked={selectedJobs.includes(job.id)}  
                 onChange={() => handleCheckboxChange(job.id)} />

              </td> {/* Checkbox column */}
                  <td>{job.Name}</td>
                  <td>{job.JobAssignee}</td>
                  <td>{job.Pipeline}</td>
                  <td>{job.Stage}</td>
                  <td>{job.Account}</td>
                  <td>{startDateFormatted}</td>
                  {/* <td>{dueDateFormatted}</td> */}

                  <td>
                    <div>{dueDateFormatted}</div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      {isOverdue && <RiErrorWarningLine style={{ color: 'red', marginRight: '5px' }} className="warning-icon" />}
                      {isOverdue && <div className="warning-message">{'This Job is Overdue'}</div>}
                    </div>
                  </td>

                  <td>{timeInCurrent} ago</td> {/* Display time in current */}

                  <td>
                    <div className="data-menu" onClick={() => toggleMenu(job.id)} style={{ cursor: 'pointer', fontSize: '20px' }}>
                      &#8942;
                    </div>
                    {openMenuId === job.id && (
                      <div className="jobdata_menu">
                        <div onClick={() => handleEdit(job.id)} style={{ color: 'blue', cursor: 'pointer' }}>Edit</div>
                        <div onClick={(txt) => handleDelete(job.id)} style={{ color: 'red', cursor: 'pointer' }}>Delete</div>
                      </div>
                    )}
                  </td>
                </tr>
              );
            } else {
              // Handle the case where StartDate is not provided
              return null; // or display some default value
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
      <ToastContainer />
    </div>
  );
};

export default JobsData;
