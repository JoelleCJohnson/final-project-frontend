'use client'
import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ItemContext } from "@/context/ItemsContext"
import { Modal, Button, Flex } from "antd"

export default function Share({  userid  }){
    const { setItemDetails, itemDetails } = useContext(ItemContext)
    
    const route = useRouter()

    const [friendsItems, setFriendsItems] = useState([])
    const [friendDetails, setFriendDetails] = useState([])
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false)

    useEffect(() => {
        fetch(`https://holiday-wishlist-jj.ue.r.appspot.com/share/${userid}`)
            .then(res => res.json())
            .then(setFriendsItems)
            .catch(console.error)
        fetch(`https://holiday-wishlist-jj.ue.r.appspot.com/info/${userid}`)
            .then(res => res.json())
            .then(setFriendDetails)
            .catch(console.error)
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

        fetch('https://holiday-wishlist-jj.ue.r.appspot.com/dashboard', {
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
    
    return(
        <main className="bg-white h-screen">
            <h1 className="text-2xl font-bold sm:text-3xl text-bold text-shadow-m text-zinc-100 text-center bg-red-600">{friendDetails[0]?.firstname}'s wishlist:</h1>
            <ul className="w-48 text-lg items-center font-medium text-gray-900 bg-zinc-100 border border-gray-200 rounded-lg m-8">
                {!friendsItems
                    ?
                    <h2>Loading...</h2>
                    :
                    friendsItems.map((item) => {
                        const thisItem = item
                        if (item.ispurchased === false) {
                            return (
                                <li key={item.listid} className="items-center justify-center">
                                    <Button className="text-center text-zinc-800 text-lg w-full hover:bg-green-500" type="primary" onClick={() => showModal(thisItem)} >
                                        {item.itemname}
                                    </Button>
                                </li>
                            )
                        }
                        else {
                            return (
                                <li key={item.listid}>
                                    <Button className="text-center text-lg text-zinc-100 bg-zinc-300 w-full hover:bg-green-500" type="primary" onClick={() => showModal(thisItem)} >
                                        {item.itemname}
                                    </Button>
                                </li>
                            )
                        }
                    })
                }
            </ul>
            <Modal
                width="40em"
                open={open}
                title={<h1 className={itemDetails?.ispurchased ? "text-zinc-400 text-center text-3xl" : "text-center text-3xl"}>{itemDetails?.itemname}</h1>}
                onCancel={handleCancel}
                className={itemDetails?.ispurchased && "text-zinc-400" }
                footer={[
                    <Flex wrap="no-wrap justify-between" gap="small">
                        {itemDetails?.ispurchased ?
                        <h2 className="text-xl text-center">This item has already been purchased.</h2>
                    :<>
                        <Button
                            key="link"
                            href={itemDetails?.itemlink}
                            type="primary"
                            loading={loading}
                            className="bg-green-500"
                        >
                            Purchase Here
                        </Button>
                            <Button key="submit" type="primary" className="bg-green-500" onClick={handlePurchase}>
                                Already Purchased?
                            </Button>
                            </>
                        }
                    </Flex>
                ]}
            >
                <h2 className="text-center text-lg">Price: ${itemDetails?.itemprice}</h2>
            </Modal>
        </main>
    )
}