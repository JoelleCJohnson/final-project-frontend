'use client'
import { UserContext } from "@/context/UserContext"
import { usePathname, useRouter } from "next/navigation"
import { useContext, useEffect } from "react"

export default function CheckAuth(){
    const {loggedIn, setLoggedIn, token, setToken } = useContext(UserContext)

    const router = useRouter()
    const pathname = usePathname()

    useEffect(()=> {
        if(!user && pathname.startsWith('/dashboard')){
            const _user = sessionStorage.getItem('user')
            if(_user) {
                setLoggedIn(JSON.parse(_user))
            } 
            else{
                router.push('/signup')
            }
        }
        if(user && pathname.startsWith('/login')){
            router.push('/dashboard')
        }
    }, [user, pathname])

    return null
}