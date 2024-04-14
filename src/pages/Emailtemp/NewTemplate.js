import React, { useState, useRef, useEffect } from 'react';
import "../../pages/Emailtemp/email.css"
import Select from 'react-select';
import { RiAddCircleLine } from 'react-icons/ri';

import { BsQuestionCircle } from 'react-icons/bs';
import { IoIosCloseCircleOutline } from "react-icons/io";
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import makeAnimated from 'react-select/animated';
const NewTemplate = () => {



    function showToast(message, type) {
        // Display toast based on the type (success, error, etc.)
        switch (type) {
            case 'success':
                toast.success(message);
                break;
            case 'error':
                toast.error(message);
                break;
            default:
                toast.info(message);
        }
    }

    const [isHelpOpen, setIsHelpOpen] = useState(false);




    const toggleHelp = () => {
        setIsHelpOpen(!isHelpOpen);
        // Add your logic here to toggle the help content or perform any other action
    };



    const [selectedOption, setSelectedOption] = useState('contacts'); // Default selected option


    const [shortcuts, setShortcuts] = useState([]);

    
    useEffect(() => {
        if (selectedOption === 'contacts') {
            // Set contact shortcuts
            const contactShortcuts = [
                { title: 'Account Shortcodes', isBold: true },
                { title: 'Account Name', isBold: false, value: 'Account_Name' },
                { title: 'Contact Shortcodes', isBold: true, value: 'Contact_Shortcodes' },
                { title: 'Contact Name', isBold: false, value: 'Contact_Name' },
                { title: 'First Name', isBold: false, value: 'First_Name' },
                { title: 'Middle Name', isBold: false , value: 'Middle_Name'},
                { title: 'Last Name', isBold: false , value: 'Last_Name'},
                { title: 'Phone number', isBold: false, value: 'Phone_number' },
                { title: 'Country', isBold: false, value: 'Country' },
                { title: 'Company name', isBold: false, value: 'Company_name ' },
                { title: 'Street address', isBold: false, value: 'Street_address' },
                { title: 'City', isBold: false, value: 'City' },
                { title: 'State/Province', isBold: false, value: 'State/Province' },
                { title: 'Zip/Postal code', isBold: false, value: 'Zip/Postal_code' },
                { title: 'Custom field:Email', isBold: false, value: 'Custom_field:Email' },
        
                { title: 'Date Shortcodes', isBold: true },
                { title: 'Current day full date', isBold: false, value: 'Current_day_full_date' },
                { title: 'Current day number', isBold: false, value:'Current_day_number' },
                { title: 'Current day name', isBold: false, value: 'Current_day _name'},
                { title: 'Current week', isBold: false, value:'Current_week' },
                { title: 'Current month name', isBold: false , value:'Current_month_name'},
                { title: 'Current quarter', isBold: false , value: 'Current_quarter'},
                { title: 'Current year', isBold: false, value:'Current_year' },
                { title: 'Last day number', isBold: false, value:'Last_day_number' },
                { title: 'Last day name', isBold: false, value:'Last_day_name' },
                { title: 'Last week', isBold: false, value: 'Last_week' },
                { title: 'Last month number', isBold: false, value:'Last_month_number' },
                { title: 'Last month name', isBold: false, value: 'Last_month_name' },
                { title: 'Last quarter', isBold: false, value: 'Last_quarter' },
                { title: 'Last_year', isBold: false, value: 'Phone_number' },
                { title: 'Next day full date', isBold: false, value: 'Phone_number' },
                { title: 'Next day number', isBold: false, value: 'Phone_number' },
                { title: 'Next day name', isBold: false, value: 'Next_day_name' },
                { title: 'Next week', isBold: false, value: 'Next_week' },
                { title: 'Next month number', isBold: false, value: 'Next_month_number' },
                { title: 'Next month name', isBold: false, value: 'Next_month_name' },
                { title: 'Next quarter', isBold: false, value: 'Next_quarter' },
                { title: 'Next year', isBold: false, value: 'Next_year' }
        
        
        
            ]; 
            setShortcuts(contactShortcuts);
        } else if (selectedOption === 'account') {
            // Set account shortcuts
            const accountShortcuts =[
                { title: 'Account Shortcodes', isBold: true },
                { title: 'Account Name', isBold: false, value: 'Account_Name' },
                { title: 'Date Shortcodes', isBold: true },
                { title: 'Current day full date', isBold: false, value: 'Current_day_full_date' },
                { title: 'Current day number', isBold: false, value:'Current_day_number' },
                { title: 'Current day name', isBold: false, value: 'Current_day _name'},
                { title: 'Current week', isBold: false, value:'Current_week' },
                { title: 'Current month name', isBold: false , value:'Current_month_name'},
                { title: 'Current quarter', isBold: false , value: 'Current_quarter'},
                { title: 'Current year', isBold: false, value:'Current_year' },
                { title: 'Last day number', isBold: false, value:'Last_day_number' },
                { title: 'Last day name', isBold: false, value:'Last_day_name' },
                { title: 'Last week', isBold: false, value: 'Last_week' },
                { title: 'Last month number', isBold: false, value:'Last_month_number' },
                { title: 'Last month name', isBold: false, value: 'Last_month_name' },
                { title: 'Last quarter', isBold: false, value: 'Last_quarter' },
                { title: 'Last_year', isBold: false, value: 'Phone_number' },
                { title: 'Next day full date', isBold: false, value: 'Phone_number' },
                { title: 'Next day number', isBold: false, value: 'Phone_number' },
                { title: 'Next day name', isBold: false, value: 'Next_day_name' },
                { title: 'Next week', isBold: false, value: 'Next_week' },
                { title: 'Next month number', isBold: false, value: 'Next_month_number' },
                { title: 'Next month name', isBold: false, value: 'Next_month_name' },
                { title: 'Next quarter', isBold: false, value: 'Next_quarter' },
                { title: 'Next year', isBold: false, value: 'Next_year' }
        
        
        
            ];setShortcuts(accountShortcuts);
        }
    }, [selectedOption]);

    const handleOptionChange = (value) => {
        setSelectedOption(value);
     
    };

 

    const [selectedOptions, setSelectedOptions] = useState(null);
    // const handleselectchange = (e) => {
    //     setSelectedOptions(e.target.value);
    //     console.log(templateName)

    // };


    const handleChange = (selectedOption) => {
        setSelectedOptions(selectedOption.value);
        console.log("Selected option:", selectedOptions); // Log the selected option
    };


    const [showDropdown, setShowDropdown] = useState(false);
    const [showDropdownhtml, setShowDropdownhtml] = useState(false);
    const [selectedShortcut, setSelectedShortcut] = useState('');
    const [selectedShortcuthtml, setSelectedShortcuthtml] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredShortcuts, setFilteredShortcuts] = useState([]);
    const [inputText, setInputText] = useState('');
    const dropdownRef = useRef(null);

  // Define your shortcut options here

    useEffect(() => {
        setFilteredShortcuts(shortcuts.filter(shortcut => shortcut.title.toLowerCase().includes(searchTerm.toLowerCase())));
    }, [searchTerm, shortcuts]);


    const handleAddShortcut = (shortcut) => {
        setInputText(prevText => prevText + `[${shortcut}]`);
        setShowDropdown(false);
      
       
    };

    const handleAddShortcuthtml = (shortcut) => {
        setTextareaValue(prevText => prevText + `[${shortcut}]`);
        setShowDropdownhtml(false);
    };
    

    

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleClickOutside = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setShowDropdown(false);
            setShowDropdownhtml(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
        setSearchTerm(''); // Clear search term when showing the dropdown
    };
    const toggleDropdownhtml = () => {
        setShowDropdownhtml(!showDropdownhtml);
        setSearchTerm(''); // Clear search term when showing the dropdown
    };
    const toggleDropdowneditor = () => {
        setShowDropdown(!showDropdown);
        setShowDropdownhtml(!showDropdownhtml);
        setSearchTerm(''); // Clear search term when showing the dropdown
    };


    const handleInputChange = (e) => {
        const { value } = e.target;
        setInputText(value); // Update inputText state with the new value
        // console.log("Email Subject:", value); // Log the value to the console
    };





    const [mode, setMode] = useState('wysiwyg'); // State to track the current mode

    const handleModeChange = (newMode) => {
        setMode(newMode);
        console.log("Mode:", newMode); // Log the selected mode to the console
    };


     
 


    const [textareaValue, setTextareaValue] = useState('');
    const onTextareaChange = (e) => {
        const { value } = e.target;
        setTextareaValue(value);
        console.log(textareaValue  )
    
    };





    const [templateName, setTemplateName] = useState("");

    const handleInputChange1 = (e) => {
        setTemplateName(e.target.value);


    };




    const animatedComponents = makeAnimated();
    const [userdata, setUserData] = useState([]);
    const [selecteduser, setSelectedUser] = useState();
    const [combinedValues, setCombinedValues] = useState([]);


    const handleuserChange = (selectedOptions) => {
        setSelectedUser(selectedOptions);
        // Map selected options to their values and send as an array
       
    }




    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch("http://192.168.1.116:8080/common/user/");
            const data = await response.json();
            setUserData(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // console.log(userdata);
    const option = userdata.map((user) => ({
        value: user._id,
        label: user.username
    }));





    const SendData = () => {
        // Validation checks
       
    
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        const raw = JSON.stringify({
            templatename: templateName,
            from: selecteduser.value,
            emailsubject: inputText ,
            wysiwyg: "true",
            html: "false",
            emailbody: textareaValue  ,
        });
    
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };
    
        fetch("http://192.168.1.116:8080/workflow/emailtemplate", requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.text();
            })
            .then((result) => {
                // Show success message
                
                console.log(result);

            
            })
            .catch((error) => {
                // Show error message
                
                console.error(error);
            });
    }









    return (
        <div className="panel">
        
            <div className="panel__header">
                <h1 className="panel__title">Create email template</h1>
            </div>
            <div className="panel__content">
                <form noValidate="">
                    <div className="form">
                        {/* Template Name */}
                        <section className="form__section">
                            <div className="form__row">
                                <div className="form__col form__col_100">
                                    <label className="_input_1k08l_1">
                                        <span className="_inputLabel_1k08l_46">Template Name</span>


                                        <div className="_field_1k08l_14" >
                                            <input

                                                className="simple-input"
                                                placeholder="Template Name"
                                                type="text"

                                                onChange={handleInputChange1}

                                            />
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </section>

                        {/* Mode */}
                        <div className="m-t-15 m-b-10">
                            <h2 className="panel__subtitle d-flex flex-center-align">
                                Mode
                                <a
                                    href="#"
                                    className="help-block__link"
                                    onClick={toggleHelp}
                                >
                                    <BsQuestionCircle className={`v2-icon ${isHelpOpen ? 'active' : ''}`} color="#007bff" />
                                </a>
                                {/* Render your help content conditionally based on `isHelpOpen` state */}
                                {isHelpOpen && (
                                    <div className="help-content">
                                        {/* Your help content goes here */}
                                    </div>
                                )}
                            </h2>
                            <div className="form__row">
                                <div className="form__col form__col_100 m-t-10">
                                    <label className="radio" data-test="import-shared-radio-component">
                                        <div className="radio__header">
                                            <input
                                                className="radio__input"
                                                type="radio"
                                                data-test="shared-radio-input"
                                                value="contacts"
                                                checked={selectedOption === 'contacts'}
                                                onChange={() => handleOptionChange('contacts')}
                                            />
                                            <div className="radio__border">
                                                <div className="radio__dot"></div>
                                            </div>
                                            <div className="radio__label" data-test="shared-radio-label">
                                                Use contact shortcodes
                                            </div>
                                        </div>
                                    </label>
                                </div>
                            </div>
                            <div className="form__row">
                                <div className="form__col form__col_100 m-t-15">
                                    <label className="radio" data-test="import-shared-radio-component">
                                        <div className="radio__header">
                                            <input
                                                className="radio__input"
                                                type="radio"
                                                data-test="shared-radio-input"
                                                value="account"
                                                checked={selectedOption === 'account'}
                                                onChange={() => handleOptionChange('account')}
                                            />
                                            <div className="radio__border">
                                                <div className="radio__dot"></div>
                                            </div>
                                            <div className="radio__label" data-test="shared-radio-label">
                                                Use account shortcodes
                                            </div>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>


                        <div className="form__row">
                            <div className="form__col form__col_100">
                                <div className="_select_5n3c2_115">
                                    <label className="_selectLabel_5n3c2_221">From</label>
                                    <div className="react-select-container css-b62m3t-container">



                                        <div className="select-container">
                                            <Select className='job-template-select-dropdown'
                                                placeholder="Form"
                                                options={option}
                                                components={animatedComponents}
                                                isMulti ={false} // Enable multi-select
                                                value={selecteduser}
                                               isClearable
                                               
                                               isSearchable
                                                onChange={handleuserChange}
                                            />

                                        </div>
                                        <div className="react-select__indicators css-tlfecz-indicators">
                                            <div className="react-select__indicator css-1wy0on6"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <section className="form__section">
                            <div className="form__row">
                                <div className="form__col form__col_100">
                                    <label className="_input_1k08l_1">
                                        <span className="_inputLabel_1k08l_46">Email Subject</span>
                                        <div className="_field_1k08l_14" data-test="input-wrapper">
                                            <input
                                                autoCapitalize="off"
                                                className="simple-input"
                                                placeholder="Email Subject"
                                                type="text"
                                                value={inputText + selectedShortcut}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </section>

                        <div className="form__row">

                            <button type="button" className="btn  add-shortcut-button" onClick={toggleDropdown}>
                                <RiAddCircleLine className="add-shortcut-icon" /> Add Shortcode
                            </button>
                            {showDropdown && (
                                <div className="dropdown" ref={dropdownRef}>
                                    <div className="search-bar">
                                        <input
                                            type="text"
                                            placeholder="Search shortcuts"
                                            value={searchTerm}
                                            onChange={handleSearchChange}
                                        />
                                        <button className="close-icon" style={{fontSize:"20px",marginTop:'4px'}} onClick={toggleDropdown}>
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

                        <div>
                            <div className="mode-selector">
                                <label>
                                    <input
                                        type="radio"
                                        value="wysiwyg"
                                        checked={mode === 'wysiwyg'}
                                        onChange={() => handleModeChange('wysiwyg')}
                                    />
                                    WYSIWYG
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        value="html"
                                        checked={mode === 'html'}
                                        onChange={() => handleModeChange('html')}
                                    />
                                    HTML
                                </label>
                            </div>

                            {/* WYSIWYG Editor */}
                            {mode === 'wysiwyg' && (
                                <section className="form__section">
                                    <div className="form__row">
                                        <div className="form__col form__col_100">
                                            {/* Apply custom CSS to remove the border */}



                                            <textarea
                                                className="wysiwyg"
                                                id="editor"
                                                name="editor"
                                                placeholder="Body  "
                                                value={textareaValue + selectedShortcuthtml}
                                                onChange={onTextareaChange}// Log the content of the textarea to the console
                                            ></textarea>

                                        </div>
                                    </div>
                                    <button type="button" className="btn  add-shortcut-button" onClick={toggleDropdownhtml}>
                                <RiAddCircleLine className="add-shortcut-icon" /> Add Shortcode
                            </button>
                            {showDropdownhtml && (
                                <div className="dropdown" ref={dropdownRef}>
                                    <div className="search-bar">
                                        <input
                                            type="text"
                                            placeholder="Search shortcuts"
                                            value={searchTerm}
                                            onChange={handleSearchChange}
                                        />
                                        <button className="close-icon" style={{fontSize:"20px",marginTop:'4px'}} onClick={toggleDropdown}>
                                        <IoIosCloseCircleOutline />
                                        </button>
                                    </div>
                                    <ul className="dropdown-list">
                                        {filteredShortcuts.map(shortcut => (
                                            <div key={shortcut.title}>
                                                <span
                                                    style={{ fontWeight: shortcut.isBold ? 'bold' : 'normal', cursor: 'pointer' }}
                                                    onClick={() => handleAddShortcuthtml(shortcut.value)}>
                                                    {shortcut.title}
                                                </span>
                                            </div>
                                        ))}
                                    </ul>
                                </div>
                            )}

                              
                         
                                </section>
                            )}

                            {/* HTML Editor */}
                            {mode === 'html' && (
                                <section className="form__section">
                                    <div className="form__row">
                                        <div className="form__col form__col_100">
                                            <textarea
                                                className="wysiwyg"
                                                id="editor"
                                                name="editor"
                                                placeholder="Body  "
                                                value={textareaValue + selectedShortcuthtml}
                                                onChange={onTextareaChange}// Log the content of the textarea to the console
                                            ></textarea>
                                        </div>
                                    </div>
                                    <button type="button" className="btn  add-shortcut-button" onClick={toggleDropdownhtml}>
                                <RiAddCircleLine className="add-shortcut-icon" /> Add Shortcode
                            </button>
                            {showDropdownhtml && (
                                <div className="dropdown" ref={dropdownRef}>
                                    <div className="search-bar">
                                        <input
                                            type="text"
                                            placeholder="Search shortcuts"
                                            value={searchTerm}
                                            onChange={handleSearchChange}
                                        />
                                        <button className="close-icon" style={{fontSize:"20px",marginTop:'4px'}} onClick={toggleDropdown}>
                                        <IoIosCloseCircleOutline />
                                        </button>
                                    </div>
                                    <ul className="dropdown-list">
                                        {filteredShortcuts.map(shortcut => (
                                            <div key={shortcut.title}>
                                                <span
                                                    style={{ fontWeight: shortcut.isBold ? 'bold' : 'normal', cursor: 'pointer' }}
                                                    onClick={() => handleAddShortcuthtml(shortcut.value)}>
                                                    {shortcut.title}
                                                </span>
                                            </div>
                                        ))}
                                    </ul>
                                </div>
                            )}

                                </section>
                            )}

                            

                        </div>



                    </div>
                </form>

            </div>
            <div className="form__row m-t-30 d-flex">
                <div className="form__col form__col_50 d-flex">
                    <button type="submit" onClick={SendData}  className="btn btn-success btn-block mr-1">
                        Save & Exit
                    </button>
                    <button onClick={SendData} className="btn btn-primary btn-block mr-1">
                        Save
                    </button>
                    <button type="button" className="btn btn-secondary btn-block">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};
export default NewTemplate;
