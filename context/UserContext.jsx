"use client"
import { createContext, useState } from "react"

export const userContext = createContext(null)

export default function UserProvider({ children }){

    const [token, setToken] = useState(null)
    const [ loggedin, setLoggedIn ] = useState(false)
    
    return(
        <UserProvider.Provider value={{ loggedin, setLoggedIn, token, setToken}} >
            {children}
        </UserProvider.Provider>
    )
}