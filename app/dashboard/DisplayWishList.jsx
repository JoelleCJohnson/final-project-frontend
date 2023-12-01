"use client"
import { useContext, useEffect } from "react"
import { Popover } from "flowbite"
import { ItemContext } from "@/context/ItemsContext"
import ItemsCard from "./ItemsCard"
import { useRouter } from "next/navigation"

export default function DisplayWishlist() {

    const { wishlist, setWishlist } = useContext(ItemContext)

    useEffect(() => {
        fetch('https://holiday-wishlist-jj.ue.r.appspot.com/dashboard')
            .then(res => res.json())
            .then(setWishlist)
            .catch(console.error)
    }, [])

    return (
        <section className="max-w-sm mx-auto flex flex-col items-center justify-center border bg-red-600 border-2 rounded-lg m-4 p-2 col-start-1 ">
            <h2 className="border border-red-600 border-2 rounded-lg m-4 p-2 text-zinc-50">Your Wishlist</h2>
            <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg m-8">

                {!wishlist ?
                    <h2>Loading...</h2>
                    :
                    wishlist.map((item) => {
                        return (
                            <li key={item.listid} className="group w-full px-4 py-2 border-b border-gray-200 rounded-t-lg">
                                <h3 className="text-center" >{item.itemname}</h3>
                                <div className="block">
                                    <p className="text-center"> Price:   ${item.itemprice}</p>
                                    <a href={`${item.itemlink}`} className="flex justify-center text-blue-500">Purchase</a>
                                    <div className="text-center border border-1 border-gray-100 flex flex-row">
                                        <p className="text-xs justify-center"> Purchased?</p>
                                        <button onClick={() => { item.ispurchased = true }} className="border bg-red-600 text-white rounded-lg p-1">Click here</button>
                                    </div>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </section >
    )
}