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
    const decodedToken = jwt.decode(token)?.userid
    console.log("Token id ---->", decodedToken)
    console.log("userid ---->", userid)

    useEffect(() => {
        fetch(`https://holiday-wishlist-jj.ue.r.appspot.com/share/${userid}`)
            .then(res => res.json())
            .then(setFriendsItems)
            .catch(console.error)
        fetch(`https://holiday-wishlist-jj.ue.r.appspot.com/info/${userid}`)
            .then(res => res.json())
            .then(setFriendDetails)
            .catch(console.error)
        if (decodedToken != userid) {
            setIsUser(false)
        }
    }, [userid])

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
        <main className='flex flex-row bg-zinc-50 h-screen'>

            <div className='col-start-1'>
                <section className='wishlist h-auto w-1/2 sm:block hidden min-w-max object-fill'></section>
            </div>

            <section className='flex flex-col rounded-sm items-center mx-auto max-w-md space-y-4 p-4 h-screen'>

                <h2 className='font-great-vibes text-center text-2xl font-bold sm:text-3xl'>{friendDetails[0]?.firstname}'s wishlist:</h2>

                <ul className='w-48 text-lg items-center font-medium text-gray-900 bg-zinc-100 border border-gray-200 rounded-lg m-8 shadow'>
                    {!friendsItems
                        ?
                        <h2>Loading...</h2>
                        :
                        friendsItems.map((item) => {
                            const thisItem = item
                            if (!isUser) {
                                if (item.ispurchased === false) {
                                    return (
                                        <li key={item.listid} className='items-center justify-center'>
                                            <Button className='text-center text-zinc-800 text-lg w-full hover:!bg-red-700' type='primary' onClick={() => showModal(thisItem)} >
                                                {item.itemname}
                                            </Button>
                                        </li>
                                    )
                                }
                                else {
                                    return (
                                        <li key={item.listid} className='items-center justify-center'>
                                            <Button className='text-center text-lg text-zinc-100 bg-zinc-300 w-full hover:!bg-zinc-300' type='primary' onClick={() => showModal(thisItem)} >
                                                {item.itemname}
                                            </Button>
                                        </li>
                                    )
                                }
                            }
                            else {
                                return (
                                    <li key={item.listid} className='items-center justify-center'>
                                        <Button className='text-center text-zinc-800 text-lg w-full hover:!bg-red-700' type='primary' onClick={() => showModal(thisItem)} >
                                            {item.itemname}
                                        </Button>
                                    </li>
                                )
                            }
                        })
                    }
                </ul>
                {(!isUser) ?
                    <Modal
                        width='40em'
                        open={open}
                        title={<h1 className={itemDetails?.ispurchased ? 'text-zinc-400 text-center text-3xl' : 'text-center text-3xl'}>{itemDetails?.itemname}</h1>}
                        onCancel={handleCancel}
                        className={itemDetails?.ispurchased && 'text-zinc-400'}
                        footer={[
                            <Flex wrap='no-wrap justify-between' gap='small'>
                                {itemDetails?.ispurchased ?
                                    <h2 className='text-xl text-center'>This item has already been purchased.</h2>
                                    : <>
                                        <Button
                                            key='link'
                                            href={itemDetails?.itemlink}
                                            type='primary'
                                            className='bg-green-500 hover:!bg-red-700'
                                        >
                                            Purchase Here
                                        </Button>
                                        <Button key='submit' type='primary' className='bg-green-500 hover:!bg-red-700' onClick={handlePurchase}>
                                            Already Purchased?
                                        </Button>
                                    </>
                                }
                            </Flex>
                        ]}
                    >
                        <h2 className='text-center text-lg'>Price: ${itemDetails?.itemprice}</h2>
                    </Modal>
                    :
                    <Modal
                        width='40em'
                        open={open}
                        title={<h1 className='text-center text-3xl'>{itemDetails?.itemname}</h1>}
                        onCancel={handleCancel}
                        footer={[
                            <Flex wrap='no-wrap justify-between' gap='small'>
                                <>
                                    <Button
                                        key='link'
                                        href={itemDetails?.itemlink}
                                        type='primary'
                                        className='bg-green-500 hover:!bg-red-700'
                                    >
                                        Purchase Here
                                    </Button>
                                </>
                            </Flex>
                        ]}
                    >
                        <h2 className='text-center text-lg'>Price: ${itemDetails?.itemprice}</h2>
                    </Modal>
                }
            </section>
        </main>
    )
}