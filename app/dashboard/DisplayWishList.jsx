"use client"
import jwt from "jsonwebtoken"
import { useContext, useEffect, useState, useMemo, React } from "react"
import { ItemContext } from "@/context/ItemsContext"
import { useRouter } from "next/navigation"
import { UserContext } from "@/context/UserContext"
import { Button, Modal } from 'antd';


export default function DisplayWishlist() {

    const { wishlist, setWishlist, show, setShow, setItemDetails, itemDetails } = useContext(ItemContext)
    const { token } = useContext(UserContext)

    const route = useRouter()

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false)

    const showModal = async (thisItem) => {
        await setItemDetails(thisItem);
        console.log(itemDetails)
        setOpen(true)
    };

    const handleOk = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setOpen(false);
        }, 3000);
    };

    const handleCancel = () => {
        setOpen(false);
    };

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

    const decodeToken = () => {
        jwt.decode(token, (err, decoded) => {
            if(err){
                console.log(err)
                next()
            }
            else{
                console.log(decoded)
                const { userid } = decoded
                // const userid = decoded.userid
                // console.log(userid)
                return `https://final-project-630f3.web.app/share/${userid}`
            }
        })
    }


    const sharelink = useMemo(() => decodeToken(), [token])

    // const showItemCard = (thisItem) => {
    //     if (show === true) {
    //         setShow(false)
    //     }
    //     else {
    //         setShow(true)
    //     }
    //     setItemDetails(thisItem)
    // }

    // const handlePurchase = (item) => {
    //     const itemData = {
    //         id: item.listid
    //     }

    //     fetch('https://holiday-wishlist-jj.ue.r.appspot.com/dashboard', {
    //         method: 'PATCH',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'mode': 'no-cors',
    //         },
    //         body: JSON.stringify(itemData)
    //     })
    //         .then(res => res.json())
    //         .then(setWishlist)
    //         .catch(console.error)
    // }
    // const deleteButton = (item) => {
    //     const deleteItem = {
    //         id: item.listid
    //     }
    //     fetch('https://holiday-wishlist-jj.ue.r.appspot.com/dashboard', {
    //         method: "DELETE",
    //         headers: {
    //             "Content-type": "application/json",
    //             Authorization: token
    //         },
    //         body: JSON.stringify(deleteItem)
    //     })
    //         .then(res => res.json())
    //         .then(setWishlist)
    //         .catch(console.error)

    // }

    const handleShareList = () => {
        const decoded = jwt.decode(token)
        const { userid } = decoded
        route.push(`/share/${userid}`)
    }

    return (
        <section className="max-w-xs mx-auto flex flex-col bg-zinc-100 rounded-lg items-center mx-auto mb-0 mt-8 max-w-md space-y-4 p-4 col-start-1 ">
            <h2 className="flex text-center text-2xl font-bold sm:text-3xl">Your Wishlist</h2>
            <p>
                Share your wishlist with this link:
            </p>
            <button onClick={handleShareList} className="item-center text-blue-700 underline">
                <a href={sharelink}>
                    {sharelink}
                </a>
            </button>
            <ul className="w-48 text-lg font-medium text-gray-900 bg-white border border-gray-200 rounded-lg m-8">
                {!wishlist
                    ?
                    <h2>Loading...</h2>
                    :
                    wishlist.map((item) => {
                        const thisItem = item
                        return (
                            <li key={item.listid}>
                                <Button className="text-center text-lg" type="primary" onClick={() => showModal(thisItem)} >
                                    {item.itemname}
                                </Button>
                            </li>
                        )
                    })
                }
            </ul>
            <Modal
                open={open}
                title={itemDetails?.itemname}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Done
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                        Already Purchased?
                    </Button>,
                    <Button
                        key="link"
                        href={itemDetails?.itemlink}
                        type="primary"
                        loading={loading}
                        onClick={handleOk}
                    >
                        Purchase Here
                    </Button>,
                ]}
            >
                <p>{itemDetails?.itemprice}</p>
                {/* <p>Some contents...</p>
                                <p>Some contents...</p>
                                <p>Some contents...</p>
                                <p>Some contents...</p> */}
            </Modal>
        </section >
    )
}