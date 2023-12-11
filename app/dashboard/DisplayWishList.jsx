'use client'
import jwt from 'jsonwebtoken'
import { useContext, useEffect, useState, React } from 'react'
import { ItemContext } from '@/context/ItemsContext'
import { useRouter, usePathname } from 'next/navigation'
import { UserContext } from '@/context/UserContext'
import { Button, Modal, Flex } from 'antd'
import { CopyOutlined } from '@ant-design/icons'


export default function DisplayWishlist() {

    const { wishlist, setWishlist, setItemDetails, itemDetails } = useContext(ItemContext)
    const { token } = useContext(UserContext)

    const [open, setOpen] = useState(false)

    const route = useRouter()
    const pathname = usePathname()


    useEffect(() => {
        if (!token) return
        fetch('https://holiday-wishlist-jj.ue.r.appspot.com/dashboard', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            }
        })
            .then(res => res.json())
            .then(setWishlist)
            .catch(console.error)
    }, [token])

    const showModal = async (thisItem) => {
        await setItemDetails(thisItem);
        setOpen(true)
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const deleteButton = () => {
        fetch(`https://holiday-wishlist-jj.ue.r.appspot.com/dashboard/${itemDetails.listid}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                Authorization: token
            }
        })
            .then(res => res.json())
            .then(setWishlist)
            .catch(console.error)
    }

    const handleShareList = () => {
        const decoded = jwt.decode(token)
        const { userid } = decoded
        route.push(`/share/${userid}`)
    }

    return (
        <main className='flex flex-row bg-zinc-50 h-screen w-screen justify-center content-center'>

            <section className='wishlist h-screen w-1/2 sm:block hidden min-w-max object-fill justify-center w-1/2'></section >

            <section className='flex flex-col rounded-sm items-center content-center  mx-auto max-w-md space-y-4 p-4 h-screen'>
                <h2 className='text-center text-2xl font-bold sm:text-3xl'>Your Wishlist</h2>
                <p>
                    Share your wishlist with this link:
                </p>
                <div >
                    <a href={`https://final-project-630f3.web.app/share/${jwt.decode(token)?.userid}`} className='item-center text-blue-700 underline'>
                        https://final-project-630f3.web.app/share/{jwt.decode(token)?.userid}
                    </a>
                    <button onClick={() => navigator.clipboard.writeText(`https://final-project-630f3.web.app/share/${jwt.decode(token)?.userid}`)}>
                        <CopyOutlined className='m-2 p-1 rounded-sm bg-zinc-200' />
                    </button>
                </div>

                <ul className='w-3/4 sm:w-96 text-xs md:text-lg items-center font-medium text-gray-900 bg-zinc-100 border border-gray-200 rounded-lg m-8 min-w-min shadow'>
                    {!wishlist
                        ?
                        <h2>Loading...</h2>
                        :
                        wishlist.map((item) => {
                            const thisItem = item
                            return (
                                <li key={item.listid} className='flex justify-between content-center items-center rounded-md sm:w-96 flex flex-row text-center text-md space-x-4 border border-red-500 border-1 p-2 m-2 bg-zinc-50 shadow' type='primary' >
                                    <div className='w-1/4'>
                                        {item.itemname}
                                    </div>
                                    <div className='w-1/4'>
                                        ${item.itemprice}
                                    </div>
                                    <a className='text-blue-500 underline rounded-xl hover:!text-green-700 p-1' target='_blank' href={item?.itemlink}>
                                        Buy
                                    </a>
                                    <button className='text-red-700 underline rounded-xl hover:!text-red-700 p-1' onClick={deleteButton}>
                                        Delete
                                    </button>
                                </li>
                            )
                        })
                    }
                </ul>
            </section>
        </main>
    )
}