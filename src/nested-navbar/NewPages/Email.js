import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
const Email = () => {
  return (
    <div className="email">
      <div className="email-nav" style={{ display: 'flex', gap: '50px', }}>
        <NavLink to='/accountsdash/email/inbox'>Inbox</NavLink>
        <NavLink to='/accountsdash/email/sent' >Sent</NavLink>

      </div>
      <div> <hr/></div>
      <div style={{paddingTop:'20px'}}><Outlet /></div>
    </div>
  )
}

export default Email