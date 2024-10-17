import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
   <div className="sidebar">
    <div className="sidebar-options">

  
    <NavLink to={'/add'} className="sidebar-option">
        <img src={assets.add_icon} alt="" />
        <p>Add Items</p>
    </NavLink >
    <NavLink to={'/list'}  className="sidebar-option">
        <img src={assets.order_icon} alt="" />
        <p>List Itmes</p>
    </NavLink>
    <NavLink to={'/orders'}  className="sidebar-option">
        <img src={assets.order_icon} alt="" />
        <p>Order</p>
    </NavLink>
    <NavLink to={'/sells'}  className="sidebar-option">
        <img src={assets.order_icon} alt="" />
        <p>Sells</p>
    </NavLink>
    <NavLink to={'/users'}  className="sidebar-option">
        <img src={assets.order_icon} alt="" />
        <p>user</p>
    </NavLink>
    </div>
   </div>
  )
}

export default Sidebar