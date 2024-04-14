import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const Workflow = () => {
  return (
    
    <div className="workflow">
      <div className="workflow-nav" style={{ display: 'flex', gap: '50px', }}>
        <NavLink to='/accountsdash/workflow/activejobs' activeClassName="active">Active Jobs</NavLink>
        <NavLink to='/accountsdash/workflow/archivedjobs' activeClassName="active">Archived Jobs</NavLink>
        <NavLink to='/accountsdash/workflow/pipelines' activeClassName="active">Pipelines</NavLink>
      </div>
      <div> <hr/></div>
     <div style={{paddingTop:'20px'}}><Outlet /></div>
    </div>
  )
}

export default Workflow