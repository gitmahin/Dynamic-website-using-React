import { createContext, useContext, useEffect, useState } from "react";


export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [user, setUser] = useState("")
    const [post, setPost] = useState([])


    const saveTokenToLocal = (usertoken) => {
        setToken(usertoken)
        return localStorage.setItem("token", usertoken)
    }

    const isLoggedin = !!token
    // console.log(isLoggedin);


    const logOutUser = () => {
        setToken('')
        setUser("")
        setPost([])
        return localStorage.removeItem("token")
    }
 
    const userAuthenticate = async () => {
        try {
            const fetchUserData = await fetch('/api/admin-user', {
                method: "GET",
                headers: { 
                    Authorization: `Bearer ${token}` 
                }
            })
            if (fetchUserData.ok) {
                const userAuthData = await fetchUserData.json()
                setUser(userAuthData)
            }
            
        } catch (error) {
            console.log('userAuthData error');

        }
    }


    useEffect(() => {
        userAuthenticate()
    }, [isLoggedin])


    const adminpostauth = async () => {
        try {
            const fetchpost = await fetch('/api/get-admin-post', {
                method: "GET",
                headers: { 
                    Authorization: `Bearer ${token}` 
                }
            })
            if (fetchpost.ok) {
                const postdata = await fetchpost.json()
                setPost(postdata)
            }
            
        } catch (error) {
            console.log('userAuthData error');

        }
    }


    useEffect(() => {
        adminpostauth()
    }, [isLoggedin])



    return (
        <AuthContext.Provider value={{ saveTokenToLocal, logOutUser, isLoggedin, user, post, token }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const authContextValue = useContext(AuthContext)
    if (!authContextValue) {
        throw new Error('useContext is using outside of the provider')
    } else {
        return authContextValue
    }

}