import React, { useRef, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../store/authenticate'

const Header = () => {
  const { isLoggedin } = useAuth()
  const { user } = useAuth()
  const meta_ref = useRef()
  const openDelWindow = useRef()

  const closeLogwin = () => {
    isLoggedin? "": openDelWindow.current.style.display = "none"
  }

  useEffect(() => {
    closeLogwin()

  }, [isLoggedin])
  


  

  return (
    <>
      
      <header>
        <div className="header-wrap">
          <div className="menu">
            <ul>
              <li><NavLink to={'/'} className={(e) => { return e.isActive ? "active-link" : "" }} >Home</NavLink></li>

              <li><NavLink to={'/contact'} className={(e) => { return e.isActive ? "active-link" : "" }} >Contact</NavLink></li>






              {isLoggedin ? <li><NavLink to={'/myblog'} className={(e) => { return e.isActive ? "active-link" : "" }} >My Blog</NavLink></li> : <><li><NavLink to={'/registration'} className={(e) => { return e.isActive ? "active-link" : "" }} id='register-menu-btn' >Registration</NavLink></li>
                <li><NavLink to={'/login'} className={(e) => { return e.isActive ? "active-link" : "" }} >Login</NavLink></li></>}


            </ul>

            <div className="head-more-option-container">
              {/* <div className="theme-mode" onClick={() =>{
                document.body.classList.toggle("dark-mode")
              } } >
               
               <span className="material-symbols-outlined">
                  brightness_high
                </span>

              </div> */}
              {isLoggedin ?
                <div className="meta-container-wrap">
                  <div onClick={(e) => meta_ref.current.classList.toggle('open')} className="profile-small-pic-btn">
                    <img src={user.profileImg} alt="Profile image" />
                  </div>
                  <div ref={meta_ref} className="meta-info-box">
                    <p className="user-email-meta-box">{user.email}</p>
                    <NavLink to={'/dashboard'} className={(e) => { return e.isActive ? "active-link" : "" }} ><li> Dashboard</li></NavLink>
                    <NavLink to={'/about'} className={(e) => { return e.isActive ? "active-link" : "" }} ><li> About</li></NavLink>
                    <div id="logout" onClick={() => openDelWindow.current.style.display = "flex"} className={(e) => { return e.isActive ? "active-link" : "" }} ><li> Logout</li></div>
                  </div>
                </div>
                : ""}


            </div>
          </div>
        </div>
      </header>
              <div className="delwindow" ref={openDelWindow} >
                <div className="del-confirm-content">
                  <h3>Are you sure to Logout?</h3>
                </div>
                <div className="del-confirm-btn">
                  <button className="cancelDel del-btn-in-del-confirm-btns" onClick={() => openDelWindow.current.style.display = "none"} >
                    No
                  </button>

                  <NavLink to={'/logout'} ><button className="confirm-delation del-btn-in-del-confirm-btns" >Yes</button></NavLink>


                </div>

              </div>
    </>
  )
}

export default Header
