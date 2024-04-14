import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
const Invoices = () => {
  return (
    <div className="invoices">
    <div className="invoices-nav" style={{ display: 'flex', gap: '50px', }}>
      <NavLink to='/accountsdash/invoices/invoice' >Invoice</NavLink >
      <NavLink to='/accountsdash/invoices/payments' >Payments</NavLink>
    
    </div>
    <div> <hr/></div>
    <div style={{paddingTop:'20px'}}><Outlet /></div>
  </div>
  )
}

export default Invoices