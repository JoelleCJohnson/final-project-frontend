'use client'
import jwt from "jsonwebtoken"
import { useContext } from "react"
import { UserContext } from "@/context/UserContext"


export default function SharePage(){
    const { token } = useContext(UserContext)
    //create a dynamic route with userid
    //get userid from token
    const decoded = jwt.decode(token)
    const userid = decoded.userid
    console.log(userid)
    return(
        <>
            <h1>Share your wishlist:</h1>
            <a href={`https://final-project-630f3.web.app/share/${userid}`} >{`https://final-project-630f3.web.app/share/${userid}`}</a>
        </>
    )
}