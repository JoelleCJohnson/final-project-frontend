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

    const deleteButton = (item) => {
        const deleteItem = {
            id: item.listid
        }
        fetch('https://holiday-wishlist-jj.ue.r.appspot.com/dashboard', {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
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
        const { userid } = decoded
        route.push(`/share/${userid}`)
    }

    return (
        <main className='flex flex-row bg-zinc-50 h-screen'>

            <div className='col-start-1'>
      
            <section className='gift-box h-auto w-3/4 max-w-lg min-w-max object-fill'></section>

            </div>

            <section className='flex flex-col rounded-sm items-center mx-auto max-w-md space-y-4 p-4 h-screen'>

                <h2 className='text-center text-2xl font-bold sm:text-3xl'>Your Wishlist</h2>

                <p>
                    Share your wishlist with this link:
                </p>
                <div >
                    <button onClick={handleShareList} className='item-center text-blue-700 underline'>
                        https://final-project-630f3.web.app/share/{jwt.decode(token)?.userid}
                    </button>
                    <button onClick={() => navigator.clipboard.writeText(`https://final-project-630f3.web.app/share/${jwt.decode(token)?.userid}`)}>
                        <CopyOutlined className='m-2 p-1 rounded-sm bg-zinc-200' />
                    </button>
                </div>

                <ul className='w-48 text-lg items-center font-medium text-gray-900 bg-zinc-100 border border-gray-200 rounded-lg m-8'>
                    {!wishlist
                        ?
                        <h2>Loading...</h2>
                        :
                        wishlist.map((item) => {
                            const thisItem = item
                            return (
                                <li key={item.listid} className='items-center justify-center'>
                                    <Button className='text-center text-zinc-800 text-lg w-full hover:!bg-red-700' type='primary' onClick={() => showModal(thisItem)} >
                                        {item.itemname}
                                    </Button>
                                </li>
                            )
                        })
                    }
                </ul>
                <Modal
                    width='40em'
                    open={open}
                    title={<h1 className='text-center text-3xl'>{itemDetails?.itemname}</h1>}
                    onCancel={handleCancel}
                    footer={[
                        <Flex wrap='no-wrap justify-between' gap='small'>
                            <Button
                                key='link'
                                href={itemDetails?.itemlink}
                                type='primary'
                                className='bg-green-700 hover:!bg-zinc-50 hover:!text-green-700 hover:!border-green-700'
                            >
                                Purchase Here
                            </Button>

                            <Button
                                key='primary'
                                className='bg-red-700 text-zinc-50 hover:!text-red-700 hover:!bg-zinc-50 hover:!border-red-700'
                                onClick={deleteButton}>
                                Delete Item from Wishlist
                            </Button>
                        </Flex>
                    ]}
                >
                    <h2 className='text-center text-lg'>Price: ${itemDetails?.itemprice}</h2>
                </Modal>
            </section >
        </main>
    )
}