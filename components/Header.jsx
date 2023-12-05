// "use client"
// import { useContext } from "react"
// import { UserContext } from "@/context/UserContext"
// import { Button } from 'flowbite-react';
// import { HiOutlineArrowRight } from 'react-icons/hi';

export default function Header() {
    // const { loggedin } = useContext(UserContext)
    return (
        <header className="text-center bg-red-600 p-8">
            <h1 className="text-bold text-shadow-m text-zinc-50">My Holiday Wishlist</h1>
            {/* {loggedin &&
                <Button outline pill>
                    <HiOutlineArrowRight className="h-6 w-6" />
                </Button>
            } */}
        </header>
    )
}