'use client'
import { UserContext } from "@/context/UserContext"
import { usePathname, useRouter } from "next/navigation"
import { useContext, useEffect } from "react"

export default function CheckAuth(){
    const { token, setToken } = useContext(UserContext)

    const router = useRouter()
    const pathname = usePathname()

    useEffect(()=> {
        if(!token && (pathname.startsWith('/dashboard') || pathname.startsWith('/share') || pathname.startsWith('/additem'))){
            const _token = sessionStorage.getItem('token')
            if(_token) {
                setToken(_token)
            } 
            else{
                router.push('/signup')
            }
        }
        if(token && !pathname.startsWith('/dashboard')){
            router.push('/dashboard')
        }
    }, [token, pathname])

    return null
}