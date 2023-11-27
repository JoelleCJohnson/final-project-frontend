"use client"
import { useContext, useEffect } from "react"
import { ItemContext } from "@/context/listContext/ItemsContext"

export default function DisplayWishlist() {

    const { wishlist, setWishlist } = useContext(ItemContext)

    useEffect(() => {
        fetch('https://holiday-wishlist-jj.ue.r.appspot.com/')
            .then(res => res.json())
            .then(setWishlist)
            .catch(console.error)
    }, [])


    return (
        <section className="max-w-sm mx-auto flex flex-col items-center justify-center border bg-red-500 border-2 rounded-lg m-4 p-2 col-start-1 ">
            <h2 className="border border-red-500 border-2 rounded-lg m-4 p-2 text-zinc-50">Your Wishlist</h2>
            <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg m-8">

                {!wishlist ?
                    <h2>Loading...</h2>
                    :
                    wishlist.map((item) => {

                            return (
                                
                                <li key={item.listid} className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg">
                                {/* When item isPurchased, disable its button */
                /* JSON. parse the info to recieve it as an object? */}
                                <div className="flex items-center">
                                    <input
                                        disabled=""
                                        defaultChecked=""
                                        id="disabled-checked-checkbox"
                                        type="checkbox"
                                        defaultValue=""
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                    <label
                                        htmlFor="disabled-checked-checkbox"
                                        className="ms-2 text-sm font-medium text-gray-400 dark:text-gray-500"
                                        >
                                        {item.itemname}
                                    </label>
                                </div>
                            </li>
                        )
                    })}
            </ul>
        </section>
    )
}