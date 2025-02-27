import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const Docs = () => {
  return (
    
    <div className="Docs">
      <div className="Docs-nav" style={{ display: 'flex', gap: '50px', }}>
        <NavLink to='/accountsdash/docs/documents' activeClassName="active">Documents</NavLink>
        <NavLink to='/accountsdash/docs/approvals' activeClassName="active">Approvals</NavLink>
        <NavLink to='/accountsdash/docs/signatures' activeClassName="active">Signatures</NavLink>
        <NavLink to='/accountsdash/docs/filerequests' activeClassName="active">File Requests</NavLink>
        <NavLink to='/accountsdash/docs/trash' activeClassName="active">Trash</NavLink>
        <NavLink to='/accountsdash/docs/irs' activeClassName="active">IRS</NavLink>
      </div>
      <div> <hr/></div>
     <div style={{paddingTop:'20px'}}><Outlet /></div>
    </div>
  )
}

export default Docs