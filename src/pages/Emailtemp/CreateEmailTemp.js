

  


 import React, { useState, useEffect } from 'react';
import "../../pages/Emailtemp/listdata.css";
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineHolder, AiOutlineEdit, AiOutlineDelete, AiOutlineCopy} from "react-icons/ai";
import {toast , ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const CreateEmailTemp = () => {
  const navigate=useNavigate();

  const [showOptions, setShowOptions] = useState(false);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });

  const toggleOptions = (event) => {
    setClickPosition({ x: event.clientX, y: event.clientY });
    setShowOptions(!showOptions);
  };

  const handleEdit = (_id, event) => {
    // Stop event propagation to prevent interference with other click events
    event.stopPropagation();
    navigate('/upemailtemplate/' + _id );
  };



  const handleDelete = (_id) => {
    const requestOptions = {
      method: "DELETE",
      redirect: "follow"
    };
  
    fetch("http://127.0.0.1:8080/workflow/emailtemplate/" + _id, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete item');
        }
        return response.text();
      })
      .then((result) => {
        console.log(result);
        toast.success('Item deleted successfully');
        // Filter out the deleted template from the state
        setEmailTemplates(emailTemplates.filter(template => template._id !== _id));
      })
      .catch((error) => {
        console.error(error);
        toast.error('Failed to delete item');
      });
  };

  const handleDuplicate = () => {
   
  };
  
  // State to manage email templates data
  const [emailTemplates, setEmailTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate fetching email templates data from an API
  
    // Assuming you fetch email templates data from an API
    const fetchEmailTemplates = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8080/workflow/emailtemplate');
        if (!response.ok) {
          throw new Error('Failed to fetch email templates');
        }
        const data = await response.json();
     
        setEmailTemplates(data.emailTemplate);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching email templates:', error);
        setIsLoading(false);
      }
    };
  
  
  
    // Fetch email templates data when the component mounts
    useEffect(() => {
      fetchEmailTemplates();
    }, []);
  
  return (
    <div className="block-container clear-container" style={{ fontFamily: 'Arial, sans-serif' }}>
        <ToastContainer />
      <div className="panel" style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px' }}>
        <header className="panel__header">
          <div className="_root_1rqwx_1 _gap20_1rqwx_29" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <a className="btn" rel="" href="/" style={{ textDecoration: 'none', color: '#fff', backgroundColor: '#007bff', padding: '8px 16px', borderRadius: '4px' }}>
              <span className="btn__text">Create template</span>
            </a>
            <a className="btn btn_border" style={{ textDecoration: 'none', color: '#007bff', padding: '8px 16px', borderRadius: '4px', border: '1px solid #007bff', marginRight: '800px' }}>
              <span className="btn__text">Copy from library</span>
            </a>
          </div>
        </header>
        <div className="panel__content">
          {isLoading ? (
            <div className="-loading" style={{ textAlign: 'center' }}>
              <div className="-loading-inner">Loading...</div>
            </div>
          ) : (
            <div className="ReactTable">
              <div className="rt-table" role="grid">
                <div className="rt-thead -header">
                  <div className="rt-tr">
                    <th className="rt-th" style={{ width:"10%", textAlign: 'center', backgroundColor: '#f2f2f2', padding: '8px', borderBottom: '1px solid #ccc' }}>Name</th>
                    <th className="rt-th" style={{ width:"76%",  textAlign: 'center', backgroundColor: '#f2f2f2', padding: '8px', borderBottom: '1px solid #ccc' }}>Subject</th>
                    <th className="rt-th" style={{ width:"30%", textAlign: 'center', backgroundColor: '#f2f2f2', padding: '8px', borderBottom: '1px solid #ccc' }}>Used in pipelines</th>
                    
                  </div>
                </div>
                <div className="rt-tbody">
                  {emailTemplates.map(template => (
                    <tr className="rt-tr" key={template._id}>
                      <td className="rt-td" style={{ width: '10%', textAlign: 'center', padding: '8px', borderBottom: '1px solid #ccc' }}>
                        <td className="btn btn_link" onClick={(event)=>{handleEdit(template._id, event)}} style={{ textDecoration: 'none', color: '#007bff' }}>{template.templatename}</td>
                      </td>
                      <td className="rt-td" style={{ width: '70%', textAlign: 'center', padding: '8px', borderBottom: '1px solid #ccc' }}>
                        {template.emailsubject}
                      </td>
                      <td className="rt-td" style={{ width: '30%', textAlign: 'center', padding: '8px', borderBottom: '1px solid #ccc' }}>
                        {template.usedInPipelines}
                      </td>
                      <td style={{ color: "blue", cursor: 'pointer' }} onClick={toggleOptions}>
      <AiOutlineHolder />
      {showOptions && (
          
        <div style={{ border: '1px solid black', padding: '5px', position: 'absolute', top: clickPosition.y, left: clickPosition.x }}>
             
            <div onClick={(event) => handleEdit(template._id, event)} ><AiOutlineEdit /> </div>
            <div onClick={()=>{handleDuplicate(template._id)}} ><AiOutlineCopy /> </div>
            <div style={{color:'red'}} onClick={(txt)=>{handleDelete(template._id)}}><AiOutlineDelete /> </div>
           
        </div>
     
      )}
    </td>
                    </tr>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateEmailTemp;
 