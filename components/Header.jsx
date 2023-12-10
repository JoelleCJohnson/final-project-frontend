"use client"
import { useContext } from "react"
import { UserContext } from "@/context/UserContext"
import { useRouter } from "next/navigation"
import { Button } from "antd"
import Image from "next/image"

export default function Header() {
    const { token } = useContext(UserContext)
    const route = useRouter()

    return (
        <header className="flex justify-between text-center bg-red-700">
            <div className="p-8 lg:items-center">
                <Image src="/Wishlily.png" width={190} height={0} alt="WishLily logo written in script" />
            </div>
            <div className="pt-14 pr-6">
                {token &&
                    <Button
                        className="flex justify-end border border-2 border-green-300 bg-zinc-50 text-red-700 shadow text-xs rounded-3xl p-x-2 hover:!border-green-300 hover:!border-2 hover:!text-red-700 hover:!font-bold"
                        onClick={() => {
                            sessionStorage.clear()
                            route.push('/')
                        }}>
                        Log out
                    </Button>
                }
            </div>
        </header>
    )
}