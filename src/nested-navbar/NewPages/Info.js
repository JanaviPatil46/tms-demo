import React from 'react'
import { MdOutlineUnarchive } from "react-icons/md";
import { LuPenLine } from "react-icons/lu";
import { PiSignatureThin } from "react-icons/pi";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { LuUserCircle2 } from "react-icons/lu";
import './info.css'
import { HiOutlineDotsVertical } from "react-icons/hi";
import LoginSwitch from '../NewPages/components/LoginSwitch'
import NotifySwitch from '../NewPages/components/NotifySwitch'
import EmailSync from '../NewPages/components/EmailSync'
const Info = () => {
  return (
    <div style={{ display: 'flex', gap: '10%' }}>
      <div className='accounts-details col-6'>
        <div className='details-header' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>Account details</h3>
          <div style={{ display: 'flex', gap: '20px', color: 'blue', cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', }}>
              <MdOutlineUnarchive style={{ marginTop: '10px' }} />
              <p>Archive</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', }}>
              <LuPenLine style={{ marginTop: '10px' }} />
              <p>Edit</p>
            </div>
          </div>
        </div>
        <div style={{ borderBottom: '2px solid blue', marginTop: '20px' }}></div>

        <div className='account-users' style={{ display: 'flex', gap: '22%', alignItems: 'center', margin: ' 20px 0' }}>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <LuUserCircle2 style={{ height: '80px', width: '80px', marginTop: '10px' }} />
            <div>
              <h3>User Name</h3>
              <h5 style={{ fontWeight: '500' }}>user type</h5>
            </div>

          </div>
          <button style={{ background: "none", border: '1px solid blue', borderRadius: '10px', color: 'blue' }}>Log in as account(read-only)</button>
        </div>
        <div >
          <h4>Account info</h4>

          <div className='info-details'>
            <p>Tags</p>

            <p>Team members</p>

            <div></div>
          </div>
        </div>
      </div>
      <div className='contact-details col-6'>
        <div className='details-header' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>Contact</h3>
          <div style={{ display: 'flex', gap: '20px', color: 'blue', cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', }}>
              <PiSignatureThin style={{ marginTop: '10px' }} />
              <p>Signer priority</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', }}>
              <AiOutlinePlusCircle style={{ marginTop: '10px' }} />
              <p>Add Contacts</p>
            </div>

          </div>
        </div>
        <div style={{ borderBottom: '2px solid blue', marginTop: '20px' }}></div>
        <div className='contact-table'>
          <table >
            <tr>
              <th></th>
              <th>LOGIN</th>
              <th>NOTIFY</th>
              <th>EMAIL SYNC</th>
              <th></th>
            </tr>
            <tr>
              <td>ABCDSE</td>
              <td><LoginSwitch/></td>
              <td><NotifySwitch/></td>
              <td><EmailSync/></td>
              <td><HiOutlineDotsVertical /></td>
            </tr>
            
          </table>
         
        </div>
      </div>
    </div>
  )
}

export default Info