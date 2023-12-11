'use client'
import jwt from 'jsonwebtoken'
import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ItemContext } from '@/context/ItemsContext'
import { Modal, Button, Flex } from 'antd'
import { UserContext } from '@/context/UserContext'

export default function Share({ userid }) {
    const { setItemDetails, itemDetails } = useContext(ItemContext)
    const { token } = useContext(UserContext)

    const route = useRouter()

    const [friendsItems, setFriendsItems] = useState([])
    const [friendDetails, setFriendDetails] = useState([])
    const [open, setOpen] = useState(false)
    const [isUser, setIsUser] = useState(true)

    useEffect(() => {
        fetch(`https://holiday-wishlist-jj.ue.r.appspot.com/share/${userid}`)
            .then(res => res.json())
            .then(setFriendsItems)
            .catch(console.error)
        fetch(`https://holiday-wishlist-jj.ue.r.appspot.com/info/${userid}`)
            .then(res => res.json())
            .then(setFriendDetails)
            .catch(console.error)
        const decodedToken = jwt.decode(token)?.userid

        setIsUser(decodedToken == userid)
    }, [userid, token])

    const showModal = async (thisItem) => {
        await setItemDetails(thisItem);
        setOpen(true)
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const handlePurchase = (item) => {
        const itemData = {
            id: item.listid
        }

        fetch(`https://holiday-wishlist-jj.ue.r.appspot.com/dashboard/${userid}/${itemDetails.listid}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'mode': 'no-cors',
            },
            body: JSON.stringify(itemData)
        })
            .then(res => res.json())
            .then(setFriendsItems)
            .catch(console.error)
    }

    return (
        <main className='flex flex-row bg-zinc-50 h-screen w-screen justify-center content-center'>

            <section className='wishlist h-screen w-1/2 sm:block min-w-max object-fill justify-center w-1/2'></section>

            <section className='flex flex-col rounded-sm items-center mx-auto max-w-md space-y-4 p-4 h-screen'>
                <h2 className='text-center text-2xl font-bold sm:text-3xl'>{friendDetails[0]?.firstname}'s wishlist:</h2>

                <ul className='w-2/3 sm:w-96 text-xs md:text-lg items-center bg-zinc-100 font-medium text-gray-900 bg-zinc-50 border border-gray-200 rounded-lg m-8 min-w-min shadow'>                    {!friendsItems
                    ?
                    <h2>Loading...</h2>
                    :
                    friendsItems.map((item) => {
                        const thisItem = item
                        if (!isUser) {
                            if (item.ispurchased === false) {
                                return (
                                    <li key={item.listid} className='flex justify-between content-center bg-zinc-50 items-center rounded-md sm:w-96 flex flex-row text-center text-md space-x-4 border border-red-500 border-1 p-2 m-2 shadow' type='primary' >
                                        <div className='w-1/2'>
                                            {item.itemname}
                                        </div>
                                        <div className='w-1/4'>
                                            ${item.itemprice}
                                        </div>
                                        <a className='border border-1 border-green-700 rounded-xl hover:!text-green-700 p-1 shadow' target='_blank' href={item?.itemlink}>
                                            Buy
                                        </a>
                                        <button className='border border-1 border-red-700 rounded-xl hover:!text-red-700 p-1 shadow' onClick={handlePurchase}>
                                            Purchased
                                        </button>
                                    </li>
                                )
                            }
                            else {
                                return (
                                    <li key={item.listid} className='flex justify-between content-center items-center rounded-md text-zinc-100 bg-zinc-300 sm:w-96 flex flex-row text-center text-md space-x-4 p-2 m-2 shadow' type='primary' >
                                    <div className='w-1/4'>
                                        {item.itemname}
                                    </div>
                                    <div className='w-1/4 text-zinc-100 bg-zinc-300'>
                                        ${item.itemprice}
                                    </div>
                                </li>
                                )
                            }
                        }
                        else {
                            return (
                                <li key={item.listid} className='flex justify-between content-center items-center bg-zinc-50 rounded-md sm:w-96 flex flex-row text-center text-md space-x-4 border border-red-500 border-1 p-2 m-2 shadow' type='primary' >
                                    <div className='w-1/4'>
                                        {item.itemname}
                                    </div>
                                    <div className='w-1/4'>
                                        ${item.itemprice}
                                    </div>
                                </li>
                            )
                        }
                    })
                }
                </ul>
            </section>
        </main>
    )
}