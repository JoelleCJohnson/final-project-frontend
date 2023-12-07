"use client"
import { useContext } from "react"
import { UserContext } from "@/context/UserContext"
import { useRouter } from "next/navigation"

export default function Header() {
    const { token } = useContext(UserContext)
    const route = useRouter()
    
    return (
        <header className="text-center bg-red-600 p-8">
            <h1 className="text-bold text-shadow-m text-zinc-50">My Holiday Wishlist</h1>
            {token &&
               <button onClick={() => {
                sessionStorage.clear()
                route.push('/')
            }}>Log out</button>
            }
        </header>
    )
}