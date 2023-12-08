'use client'
import jwt from "jsonwebtoken"
import { useContext, useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { ItemContext } from "@/context/ItemsContext"

export default function Share({ params: { userid } }){
    const [friendsItems, setFriendsItems] = useState([])
    const [friendDetails, setFriendDetails] = useState([])

    const { show, setShow, setItemDetails } = useContext(ItemContext)


    const route = useRouter()


    const showItemCard = (thisItem) => {
        if (show === true) {
            setShow(false)
        }
        else {
            setShow(true)
        }
        setItemDetails(thisItem)
    }

    useEffect(() => {
        fetch(
            `https://holiday-wishlist-jj.ue.r.appspot.com/share/${userid}`
            // `http://http://localhost:3000/share/${userid}`
        )
            .then(res => res.json())
            .then(setFriendsItems)
            .catch(console.error)
        fetch(
            `https://holiday-wishlist-jj.ue.r.appspot.com/info/${userid}`
            // `http://localhost:3001/info/${userid}`
        )
            .then(res => res.json())
            .then(setFriendDetails)
            .catch(console.error)
    }, [userid])

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

    const handleShareList = () => {
        console.log(userid)
    }

    console.log(friendDetails)
    
    return(
        <main className="bg-white h-screen">
            <h1 className="text-2xl font-bold sm:text-3xl text-bold text-shadow-m text-zinc-100 text-center bg-red-600">{friendDetails[0]?.firstname}'s wishlist:</h1>
            <ul className="max-w-xs mx-auto flex flex-col bg-zinc-100 rounded-lg items-center mx-auto mb-0 mt-8 space-y-4 p-4 max-h-fit col-start-1">
                {!friendsItems
                    ?
                    <h2>Loading... </h2>
                    :
                    friendsItems.map((item) => {
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
                                        </div>
                                    }
                                </li>
                            )
                        }
                        else {
                            return (
                                <li key={item.listid} className="group w-full px-4 py-2 border-b border-gray-200 bg-gray-400 text-zinc-200" onClick={() => showItemCard(thisItem)}>
                                    <h3 className="text-center" >{item.itemname}</h3>
                                </li>
                            )
                        }
                    }
                    )
                }
            </ul>
        </main>
    )
}