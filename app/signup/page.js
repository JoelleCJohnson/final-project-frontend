'use client'
import { useContext } from "react"
import { useRouter } from "next/navigation";
import { userContext }from "@/context/UserContext";
import Signup from "./Signup";

export default function SignupPage() {
    const router = useRouter()

    const { setLoggedin } = useContext(userContext)

    const handleSignup = async (e) => {
        e.preventDefault()
        setLoggedin(true)
        router.push('/dashboard')
    }

    return(
        <Signup />
    )
}