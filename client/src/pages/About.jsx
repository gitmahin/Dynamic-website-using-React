import React, { useEffect, useRef } from 'react'
import { useAuth } from '../store/authenticate.jsx'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const About = () => {
  const { user } = useAuth()
  const { token } = useAuth()
  const { saveTokenToLocal } = useAuth()
  const openDelWindow = useRef()
  const navigateTo = useNavigate()

  const deleteUser = async (user) => {
    try {
      const fetchUserDelation = await fetch(`/api/delete-user${user}`, {
        method: "DELETE",
        headers: {
          Authorization: token

        }
      })
      if (fetchUserDelation.status == 200) {
        toast.error('Account has been DELETED')
        navigateTo('/registration', { replace: true })
        saveTokenToLocal("")

      } else {
        toast.error('Error account delation')
      }

    } catch (error) {
      toast.error("Something went wrong")

    }
  }

  return (
    <div className='about-wrapper'>
      <h1>About</h1>
      <div className="about-container">
        <div className="about-img">
          <img src={user.profileImg} alt="" />

        </div>
        <div className="about-email">
          <p>{user.email}</p>

        </div>
        <div className="about-meta-info">
          <div>
            <span>Register Date:</span><p>{user.registerDate}</p>

          </div>
          <div>
            <span>Last Login:</span><p>{user.lastLoginDate}</p>

          </div>

        </div>
        <div className="danger-zone">
          <p>Danger zone</p>
          <button className='delete-account-btn' onClick={() => openDelWindow.current.style.display = "flex"} >Delete My Account</button>

          <div className="delwindow" ref={openDelWindow} >
            <div className="del-confirm-content">
              <h3>Are you sure to delete your account?</h3>
              <p>Note that, your all data will be lost forever</p>
            </div>
            <div className="del-confirm-btn">
              <button className="cancelDel del-btn-in-del-confirm-btns" onClick={() => openDelWindow.current.style.display = "none"} >
                Cancel
              </button>

              <button className="confirm-delation del-btn-in-del-confirm-btns" id='confirm-delation' onClick={() => deleteUser(user.email)} > <lord-icon
              target=".confirm-delation"
                src="https://cdn.lordicon.com/skkahier.json"
                trigger="hover" style={{ width: "20px" }}>
              </lord-icon> Delete</button>


            </div>

          </div>

        </div>

      </div>
    </div>
  )
}

export default About
