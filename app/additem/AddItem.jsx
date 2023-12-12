'use client'
import { Button, Checkbox, Label, TextInput } from 'flowbite-react'
import { ItemContext } from '@/context/ItemsContext'
import { UserContext } from '@/context/UserContext'
import { useContext } from 'react'
import { useRouter } from 'next/navigation'

export default function AddItem() {
    const { setWishlist } = useContext(ItemContext)
    const { token } = useContext(UserContext)

    const route = useRouter()

    const handleAddItem = (e) => {
        e.preventDefault()

        const formData = {
            name: e.target.itemName.value,
            itemLink: e.target.itemLink.value,
            price: e.target.itemPrice.value
        }

        fetch('https://holiday-wishlist-jj.ue.r.appspot.com/dashboard', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'mode': 'no-cors',
                Authorization: token
            },
            body: JSON.stringify(formData),
        })
            .then(res => res.json())
            .then(setWishlist)
            .catch(alert)

        route.push('/dashboard')
    }

    return (
        <main className='flex justify-around lg:justify-start lg:ml-0 lg:justify-between w-screen h-auto bg-zinc-50'>

            <section className='gift-box h-screen min-w-max md:w-1/2 sm:block hidden min-w-max object-fill'></section>

            <form className='m-24 w-1/2 justify-center content-center items-center min-w-max sm:max-w-fit sm:w-1/4' onSubmit={handleAddItem}>
                <div className='mx-auto max-w-lg text-center'>
                    <h2 className='text-2xl font-bold sm:text-3xl mb-4'>Add an Item to Your Wishlist</h2>
                </div>

                <div className='mb-2'>
                    <div className='mb-2 block'>
                        <Label htmlFor='itemName' value='Item Name:' />
                    </div>
                    <TextInput id='itemName' name='itemName' type='text' placeholder='Add the name of your wishlist item here' required shadow />
                </div>

                <div className='mb-2'>
                    <div className='mb-2 block'>
                        <Label htmlFor='itemLink' value='Item Link: Links can be up to 500 characters. ' />
                        <a href='https://www.shorturl.at' className='text-blue-700 text-sm underline font-bold'>
                            Shorten your link here.
                        </a>
                    </div>
                    <TextInput id='itemLink' name='itemLink' type='text' placeholder='Add the link for your wishlist item here' required shadow />
                </div>

                <div className='mb-2'>
                    <div className='mb-2 block'>
                        <Label htmlFor='itemPrice' value='Item Price:' />
                    </div>
                    <TextInput id='itemPrice' name='itemPrice' step='0.01' min='0' type='number' placeholder='Add the price for your wishlist item here' required shadow />
                </div>

                <Button className='shadow mt-6 bg-white text-red-500 border border-2 border-green-500 w-full hover:!bg-green-700 hover:!text-zinc-50' type='submit'>
                    Add to Wishlist
                </Button>
            </form>
        </main>
    )
}