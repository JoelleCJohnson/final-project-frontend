"use client"
import {ItemContext} from "@/context/listContext/ItemsContext"
import { useContext } from "react"

export default function AddItem() {
    const { setWishlist } = useContext(ItemContext)

    const handleAddItem = (e) => {
        e.preventDefault()

        const formData = {
            name: e.target.itemName.value,
            itemLink: e.target.itemLink.value,
            price: e.target.itemPrice.value
        }

    fetch('https://holiday-wishlist-jj.ue.r.appspot.com/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'mode': 'no-cors',
            },
            body: JSON.stringify(formData),
        })
            .then(res => res.json())
            .then(setWishlist)
            .catch(alert)

    }

    return (
        <form onSubmit={handleAddItem}
        className="max-w-sm mx-auto flex flex-col items-center justify-center border border-red-400 border-2 rounded-lg m-4 p-2">
            <h2 className="p-4 text-center border border-red-400 border-2 rounded-lg"> Add an Item to Your Wishlist:</h2>
            <label
                htmlFor="itemName"
                className="block mb-2 text-sm font-medium text-gray-900 text-center p-2"
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
                Item Link(Links can be up to 500 characters. To shorten your link, click <a href="https://www.shorturl.at" className="text-blue-700">here</a>):
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
                type="decimal"
                id="itemPrice"
                aria-describedby="helper-text-explanation"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Add the price for your wishlist item here"
            />

            
            <button
                type="submit"
                className="focus:outline-none text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 m-2"
            >
                Add to Wishlist
            </button>
        </form>
    )
}