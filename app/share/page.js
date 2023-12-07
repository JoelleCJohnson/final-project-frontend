'use client'
import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { handlePurchase, showItemCard } from "../dashboard/DisplayWishList"
import { ItemContext } from "@/context/ItemsContext"



export default function SharePage() {
    const [friendsItems, setFriendsItems] = useState()

    const {show, setShow} = useContext(ItemContext)

    const route = useRouter()
    const { userid } = route.query

    useEffect(() => {
        fetch(`https://holiday-wishlist-jj.ue.r.appspot.com/share/${userid}`)
            .then(res => res.json())
            .then(setFriendsItems)
            .catch(console.error)
    }, [userid])

    return (
        <>
            <h1>Share your wishlist:</h1>
            <a href={`https://final-project-630f3.web.app/share/${userid}`} >{`https://final-project-630f3.web.app/share/${userid}`}</a>
            {friendsItems.map((item) => {
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
            })}
        </>)
}