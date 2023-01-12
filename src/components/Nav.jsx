import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import '../css/Nav.css';


const Nav = ({ signInWithGoogle, user, signout }) => {
    const [isSearchActive, setSearchActive] = useState(false)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    return (
        <div>
            <nav className={isSidebarOpen ? 'active' : ''} >
                <div className="nav-bar">
                    <i className='bx bx-menu sidebarOpen' onClick={() => setIsSidebarOpen(prev => !prev)} ></i>
                    <span className="logo navLogo"><a href="/">Lineup life <small className='beta'>beta</small></a></span>

                    <div className="menu">
                        <div className="logo-toggle">
                            <span className="logo"><a href="/">Lineup life</a></span>
                            <i className='bx bx-x siderbarClose' onClick={() => setIsSidebarOpen(prev => !prev)} ></i>
                        </div>

                        <ul className="nav-links">
                            <li><NavLink className="btn" to={`/`}>
                                Home
                            </NavLink></li>
                            <li><NavLink className="btn" to={'/stats'}>
                                Stats
                            </NavLink></li>
                            <li><NavLink className="btn" to={'/help'}>
                                Help
                            </NavLink></li>
                        </ul>
                    </div>

                    <div className="darkLight-searchBox">
                        {/* <div className="dark-light ">
                            <i className='bx bx-moon moon'></i>
                            <i className='bx bx-sun sun'></i>
                        </div> */}

                        <div className="searchBox">
                            <div className={isSearchActive ? 'searchToggle active' : 'searchToggle'} onClick={() => setSearchActive(prev => !prev)}>
                                <i className='bx bx-x cancel'></i>
                                <i className='bx bx-search search'></i>
                            </div>

                            <div className="search-field">
                                <input type="text" placeholder="Journal search coming soon..." />
                                <i className='bx bx-search'></i>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginRight: "50px" }} className="login-btn">
                        {user == null ? <NavLink onClick={signInWithGoogle} className="btn" >
                            Login
                        </NavLink> : <div className="dropdown-usericon">
                            <img
                                className='userProfileImg'
                                src={user.photoURL}
                                alt="user profile"
                                onError={({ currentTarget }) => {
                                    currentTarget.onerror = null; // prevents looping
                                    currentTarget.src = "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=";
                                }}
                            />
                            <div className="dropdown-content">
                                <NavLink onClick={signout} >Signout!</NavLink>
                            </div>
                        </div>}


                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Nav