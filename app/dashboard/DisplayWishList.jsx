"use client"
import jwt from "jsonwebtoken"
import { useContext, useEffect, useMemo } from "react"
import { ItemContext } from "@/context/ItemsContext"
import { useRouter } from "next/navigation"
import { UserContext } from "@/context/UserContext"


export default function DisplayWishlist() {

    const { wishlist, setWishlist, show, setShow, setItemDetails } = useContext(ItemContext)
    const { token } = useContext(UserContext)
    const route = useRouter()

    const sharelink = useMemo(()=>{
        const decoded = jwt.decode(token)
        const { userid } = decoded
        return `https://final-project-630f3.web.app/share/${userid}`
    },[token])

    useEffect(() => {
        if (!token) return
        fetch(
            'https://holiday-wishlist-jj.ue.r.appspot.com/dashboard'
            // 'http://localhost:3001/dashboard'
            , {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token
                }
            })
            .then(res => res.json())
            .then(setWishlist)
            .catch(console.error)
    }, [token])

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
                "Content-type": "application/json",
                Authorization: token
            },
            body: JSON.stringify(deleteItem)
        })
            .then(res => res.json())
            .then(setWishlist)
            .catch(console.error)

    }



    const handleShareList = () => {
        const decoded = jwt.decode(token)
        const userid = decoded.userid
        route.push(`/share/${userid}`)
    }

    return (
        <section className="max-w-xs mx-auto flex flex-col bg-zinc-100 rounded-lg items-center mx-auto mb-0 mt-8 max-w-md space-y-4 p-4 col-start-1 ">
            <h2 className="flex text-center text-2xl font-bold sm:text-3xl">Your Wishlist</h2>
            <p>
                Share your wishlist with this link:
            </p>
            <button onClick={handleShareList} className="item-center text-blue-700 underline">
                {sharelink}
            </button>
            <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg m-8">
                {!wishlist 
                    ?
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
                                <li key={item.listid} className="group w-full px-4 py-2 border-b border-gray-200 bg-gray-300 text-zinc-100" onClick={() => showItemCard(thisItem)}>
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