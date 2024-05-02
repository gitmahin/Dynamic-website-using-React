import React from 'react'
import { useAuth } from '../store/authenticate.jsx'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Logout = () => {
    const { logOutUser } = useAuth()
    const navigateTo = useNavigate()

    useEffect(() => {
        logOutUser()
    }, [logOutUser])

    return navigateTo('/login', { replace: true })
}

export default Logout
