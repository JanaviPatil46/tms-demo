import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
const EmailTempsend = () => {


    
    const animatedComponents = makeAnimated();
    const [userdata, setUserData] = useState([]);
        const [selectsortcode, setSelectShortcode] = useState("");
    const [selecteduser, setSelectedUser] = useState();
  

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8080/admin/accountdetails");
            const data = await response.json();
            setUserData(data.accounts);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // console.log(userdata);
    const option = userdata.map((user) => ({
        value: user._id,
        label: user.accountName
    }));


   

    const [selectaccId, setselectaccId] = useState();
    console.log(selectaccId)
    const handleuserChange = (selectedOptions) => {
        if (selectedOptions && selectedOptions.value) {
          setSelectedUser(selectedOptions);
        } else {
          console.error("Invalid selected options:", selectedOptions);
        }
      };
      
      useEffect(() => {
        if (selecteduser && selecteduser.value) {
          setselectaccId(selecteduser.value);
        }
      }, [selecteduser]);



    const [dataGetEmail, setDataGetEmail] = useState(null);
    

    const datasend = () => {
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
          redirect: "follow"
        };
      
        // Constructing the URL with query parameters
        const url = `http://127.0.0.1:8080/admin/accountdetails/accountshortcode/${selectaccId}?accountshortcode=${selectsortcode}`;
      
        fetch(url, requestOptions)
          .then((response) => response.text())
          .then((result) => {
            setDataGetEmail(result);
          })
          .catch((error) => console.error(error));
      };
  return (

    <div className='from' style={{padding:"50px"}}>
    <div className="form__row">
                            <div className="form_col form_col_100">
                      <div className="_select_5n3c2_115">
                                    <label className="_selectLabel_5n3c2_221">Account</label>
                                              <div className="react-select-container css-b62m3t-container">
                                        
                                        <div className="select-container">
                                            <Select className='job-template-select-dropdown'
                                                placeholder="Account"
                                                options={option}
                                                components={animatedComponents}
                                                isMulti ={false} // Enable multi-select
                                                value={selecteduser}
                                               isClearable
                                               
                                               isSearchable
                                                onChange={handleuserChange}
                                            />

                                        </div>
                                        </div></div>
                                 
                                  <div className="_select_5n3c2_115">
                                    <label className="_selectLabel_5n3c2_221">Email Template</label>
                                              <div className="react-select-container css-b62m3t-container">
                                        
                                        <div className="select-container">
                                            <Select className='job-template-select-dropdown'
                                                placeholder="Email Template"
                                                options={option}
                                                components={animatedComponents}
                                                isMulti ={false} // Enable multi-select
                                                value={selecteduser}
                                               isClearable
                                               
                                               isSearchable
                                                onChange={handleuserChange}
                                            />

                                        </div>
                                        
                                        
                                        </div></div></div>
                                        </div>

                       <div className='inputemail'>
                        <input placeholder='Enter Email' type='email'  />
                             </div>

                                        {/* <div className='shortcodes'>
                                  
                                         <label>Add Shortcodes  </label>
                                            <select className="form-select" aria-label="Default select example" value={selectsortcode}  onChange={e => setSelectShortcode(e.target.value)} >
                                            <option selected Value="">Choose State</option>

                                            <option selected Value="Account_Name">Account Name</option>
                                            <option selected Value="Contact_Name">Contact  Name</option>
                                         
                                   
                                            
                               
                                           
                                        
                        
                                          </select>


                                        </div> */}

                                    <div>
                                        <button onClick={datasend}>Send </button>
                                       </div>
                                      

                                        <div>
                                        <button >Cancel </button>
                                      </div>
                                        </div>

                                     
  )
}

export default EmailTempsend