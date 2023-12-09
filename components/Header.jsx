"use client"
import { useContext } from "react"
import { UserContext } from "@/context/UserContext"
import { useRouter } from "next/navigation"
import {Button} from "antd"
import Image from "next/image"

export default function Header() {
    const { token } = useContext(UserContext)
    const route = useRouter()
    
    return (
        <header className="flex justify-between text-center bg-red-600 p-8">
            <Image src="/Wishlily.png" width={190} height={0} alt="WishLily logo written in script"/>
            {token &&
               <Button className="flex justify-end text-zinc-50 text-xs border border-1 border-zinc-50 rounded-3xl p-x-2 hover:!bg-zinc-100 hover:!text-red-600 hover:!font-bold"
               onClick={() => {
                sessionStorage.clear()
                route.push('/')
            }}>Log out</Button>
            }
        </header>
    )
}