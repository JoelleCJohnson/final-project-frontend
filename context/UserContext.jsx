"use client"
import { createContext, useState } from "react"

export const UserContext = createContext(null)

export default function UserProvider({ children }){

    const [ token, setToken ] = useState()

    const _setToken = (data) => {
        if(data){
            sessionStorage.setItem("token", data)
        }
        else{
            sessionStorage.removeItem("token")
        }
        setToken(data)
    }

    
    return(
        <UserContext.Provider value={{ token, setToken: _setToken }} >
            {children}
        </UserContext.Provider>
    )
}