"use client"
import { createContext, useEffect, useState } from "react"

export const userContext = createContext(null)

export default function UserContext(){

    const [token, setToken] = useState()
    const [ loggedin, setLoggedIn ] = useState()
    
    return(
        <>
        </>
    )
}