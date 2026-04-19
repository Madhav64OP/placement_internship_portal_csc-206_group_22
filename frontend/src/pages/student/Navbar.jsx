/**
* Placement and Internship Portal.
* File: Navbar.jsx
* Description: Navigation bar component for accessing different sections of the student portal such as home, apply, track and results pages
*/
import React from 'react'
import iitrLogo from '../../assets/iitr.png'
import { Link, NavLink } from 'react-router-dom'

function StudentPortalNavbar() {
    return (
        <>
            <nav id="navbar-body" className='flex justify-between items-center top-0 sticky bg-pip-dark py-2 px-3'>
                <div id="navbar-left" className='flex justify-center items-center gap-2 px-2 py-1'>
                    <NavLink to="/" id="navbar-left-pic-logo" className='text-lg font-bold text-pip-bg hover:opacity-60 transition-opacity duration-260 rounded-4xl p-1 bg-pip-dark border-2'>
                        PIC
                    </NavLink>
                    <NavLink to="/" id="navbar-left-iitr-logo">
                        <img src={iitrLogo} alt="IITR Logo" className='h-10' />
                    </NavLink>
                </div>
                <div id="navbar-right" className='flex justify-center items-center gap-2 px-2 py-1'>
                    <NavLink to="/apply" className={({ isActive }) =>
                            `text-pip-dark px-4 py-3 text-sm   font-semibold rounded-3xl bg-pip-bg transition-all duration-300 ${isActive ? 'bg-gray-800 opacity-45' : 'hover:opacity-45'
                        }`
                    }>
                        Apply
                    </NavLink>
                    <div id="navbar-right-track-btn">
                        <NavLink to="/track" className={({ isActive }) =>
                            `text-pip-dark px-4 py-3 text-sm   font-semibold rounded-3xl bg-pip-bg transition-all duration-300 ${isActive ? 'bg-gray-800 opacity-45' : 'hover:opacity-45'
                        }`
                        }>
                            Track
                        </NavLink>
                    </div>
                    <div id="navbar-right-results-btn">
                        {/* <NavLink to="/results" className={({ isActive }) =>
                            `text-pip-dark px-4 py-3 text-sm   font-semibold rounded-3xl bg-pip-bg transition-all duration-300 ${isActive ? 'bg-gray-800 opacity-45' : 'hover:opacity-45'
                        }`
                        }>
                            Results
                        </NavLink> */}
                    </div>
                    <div id="navbar-right-user-profile-btn">
                        <NavLink to="/profile" className={({ isActive }) =>
                            `text-pip-dark px-2 py-2 text-sm   font-semibold rounded-4xl bg-pip-bg transition-all duration-300 ${isActive ? 'bg-gray-800 opacity-45' : 'hover:opacity-45'
                        }`
                        }>
                            <i className="fa-solid fa-user"></i>
                        </NavLink>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default StudentPortalNavbar