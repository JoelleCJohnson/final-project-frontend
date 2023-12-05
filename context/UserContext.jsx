"use client"
import { createContext, useState } from "react"

export const UserContext = createContext(null)

export default function UserProvider({ children }){

    const [ token, setToken ] = useState()
    const [ loggedin, setLoggedIn ] = useState()

    const _setLoggedIn = (data) => {
        if(data){
            sessionStorage.setItem("user", JSON.stringify(data))
        }
        else{
            sessionStorage.removeItem("user")
        }
        setLoggedIn(data)
    }

    const _setToken = (token) => {
        setToken(token.token)
    }

    
    return(
        <UserContext.Provider value={{ token, setToken, loggedin, setLoggedIn: _setLoggedIn }} >
            {children}
        </UserContext.Provider>
    )
}