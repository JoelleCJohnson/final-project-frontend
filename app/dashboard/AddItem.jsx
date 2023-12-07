"use client"
import { ItemContext } from "@/context/ItemsContext"
import { UserContext } from "@/context/UserContext"
import { useContext } from "react"

export default function AddItem() {
    const { setWishlist } = useContext(ItemContext)
    const { token } = useContext(UserContext)

    const handleAddItem = (e) => {
        e.preventDefault()

        const formData = {
            name: e.target.itemName.value,
            itemLink: e.target.itemLink.value,
            price: e.target.itemPrice.value
        }

    fetch(
        'https://holiday-wishlist-jj.ue.r.appspot.com/dashboard'
            // 'http://localhost:3001/dashboard'
    , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'mode': 'no-cors',
                Authorization: token
            },
            body: JSON.stringify(formData),
        })
            .then(res => res.json())
            .then(setWishlist)
            .catch(alert)

    }

    return (
        <form onSubmit={handleAddItem} className="max-w-xs mx-auto flex flex-col bg-zinc-100 rounded-lg items-center mx-auto mb-0 mt-8 max-w-md space-y-4 p-4">
            <h2 className="flex text-center text-2xl font-bold sm:text-3xl"> Add an Item to Your Wishlist</h2>
            <label
                htmlFor="itemName"
                className="block mb-2 text-sm font-medium text-gray-900 text-center "
            >
                Item Name:
            </label>
            <input
                type="text"
                id="itemName"
                aria-describedby="helper-text-explanation"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Add the name of your wishlist item here"
            />

            <label
                htmlFor="itemLink"
                className="block mb-2 text-sm font-medium text-gray-900 text-center m-1 p-2"
            >
                Item Link (Links can be up to 500 characters. To shorten your link, click <a href="https://www.shorturl.at" className="text-blue-700">here</a>):
            </label>
            <input
                type="text"
                id="itemLink"
                aria-describedby="helper-text-explanation"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Add the link for your wishlist item here"
            />

            <label
                htmlFor="itemPrice"
                className="block mb-2 text-sm font-medium text-gray-900 text-center p-2"
            >
                Item Price:
            </label>
            <input
                type="number"
                id="itemPrice"
                aria-describedby="helper-text-explanation"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Add the price for your wishlist item here"
            />

            
            <button
                type="submit"
                className="focus:outline-none text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 m-2 p-4"
            >
                Add to Wishlist
            </button>
        </form>
    )
}