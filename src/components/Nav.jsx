import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import '../css/Nav.css';


const Nav = () => {
    const [isSearchActive, setSearchActive] = useState(false)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    return (
        <div>
            <nav className={isSidebarOpen ? 'active' : ''} >
                <div className="nav-bar">
                    <i className='bx bx-menu sidebarOpen' onClick={() => setIsSidebarOpen(prev => !prev)} ></i>
                    <span className="logo navLogo"><a href="/">Lineup life</a></span>

                    <div className="menu">
                        <div className="logo-toggle">
                            <span className="logo"><a href="/">Lineup life</a></span>
                            <i className='bx bx-x siderbarClose' onClick={() => setIsSidebarOpen(prev => !prev)} ></i>
                        </div>

                        <ul className="nav-links">
                            <li><NavLink className="btn" to={`/`}>
                                Home
                            </NavLink></li>
                            <li><NavLink className="btn" to={'/courses'}>
                                Stats
                            </NavLink></li>
                        </ul>
                    </div>

                    <div className="darkLight-searchBox">
                        <div className="dark-light ">
                            <i className='bx bx-moon moon'></i>
                            <i className='bx bx-sun sun'></i>
                        </div>

                        <div className="searchBox">
                            <div className={isSearchActive ? 'searchToggle active' : 'searchToggle'} onClick={() => setSearchActive(prev => !prev)}>
                                <i className='bx bx-x cancel'></i>
                                <i className='bx bx-search search'></i>
                            </div>

                            <div className="search-field">
                                <input type="text" placeholder="Search..." />
                                <i className='bx bx-search'></i>
                            </div>
                        </div>
                    </div>

                    <div className="login-btn">
                        <NavLink className="btn" to={'/login'}>
                            Login
                        </NavLink>
                        <NavLink className="btn" to={'/signup'}>
                            Singup
                        </NavLink>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Nav