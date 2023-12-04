"use client"
import { useContext, useEffect, useState } from "react"
import { ItemContext } from "@/context/ItemsContext"
import { useRouter } from "next/navigation"

export default function DisplayWishlist() {
    const [show, setShow] = useState(false)
    const [itemDetails, setItemDetails] = useState()

    const { wishlist, setWishlist } = useContext(ItemContext)

    const route = useRouter()

    useEffect(() => {
        fetch('https://holiday-wishlist-jj.ue.r.appspot.com/dashboard')
            .then(res => res.json())
            .then(setWishlist)
            .catch(console.error)
    }, [])


    const showItemCard = (thisItem) => {
        if (show === true) {
            setShow(false)
        }
        else {
            setShow(true)
        }
        setItemDetails(thisItem)
    }

    const handlePurchase = (item) => {
        const itemData = {
            id: item.listid
        }

        fetch('https://holiday-wishlist-jj.ue.r.appspot.com/dashboard', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'mode': 'no-cors',
            },
            body: JSON.stringify(itemData)
        })
            .then(res => res.json())
            .then(setWishlist)
            .catch(console.error)
    }

    const deleteButton = (item) => {
        const deleteItem = {
            id: item.listid
        }
        fetch('https://holiday-wishlist-jj.ue.r.appspot.com/dashboard', {
            method: "DELETE",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(deleteItem)
        })
            .then(res => res.json())
            .then(setWishlist)
            .catch(console.error)

    }

    return (
        <section className="max-w-sm mx-auto flex flex-col items-center justify-center border bg-red-600 border-2 rounded-lg m-4 p-2 col-start-1 ">
            <h2 className="border border-red-600 border-2 rounded-lg m-4 p-2 text-zinc-50">Your Wishlist</h2>
            <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg m-8">

                {!wishlist ?
                    <h2>Loading...</h2>
                    :
                    wishlist.map((item) => {
                        const thisItem = item
                        if (item.ispurchased === false) {
                            return (
                                <li key={item.listid} className="group w-full px-4 py-2 border-b border-gray-200 rounded-t-lg" onClick={() => showItemCard(thisItem)}>      
                                        <h3 className="text-center" >{item.itemname} </h3>

                                    {show &&
                                        <div className="block">
                                            <p className="text-center"> Price:   ${item.itemprice}</p>
                                            <a href={`${item.itemlink}`} className="flex justify-center text-blue-500">Purchase</a>
                                            <p>
                                                Already purchased?<button className="flex justify-center text-blue-600" onClick={() => handlePurchase(item)}>click here!</button>
                                            </p>
                                        <button className=" px-1.5 text-xs text-red-500 border border-red-300 rounded-full hover:bg-red-500 hover:text-white" onClick={() => deleteButton(item)}>x</button>
                                        </div>
                                    }
                                </li>
                            )
                        }
                        else {
                            return (
                                <li key={item.listid} className="group w-full px-4 py-2 border-b border-gray-200 bg-gray-400 text-zinc-200" onClick={() => showItemCard(thisItem)}>
                                    <h3 className="text-center" >{item.itemname}</h3>
                                    {show &&
                                        <button className="px-1.5 text-xs text-red-500 border border-red-300 rounded-full hover:bg-red-500 hover:text-white" onClick={() => deleteButton(item)}>x</button>
                                    }
                                </li>
                            )
                        }
                    })
                }
            </ul>
        </section >
    )
}