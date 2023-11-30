'use client'
import { useContext } from "react"
import { userContext } from "@/context/UserContext"

export default function Login() {
    const { token, setToken } = useContext(userContext)
    return(
        <>
        {/* generate token 
            usecontext
        */}
        </>
    )
}