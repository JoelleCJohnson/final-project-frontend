"use client"
import { createContext, useEffect, useState } from "react"

export const ItemContext = createContext(null)

export default function ItemsContext({ children }) {

    const [wishlist, setWishlist] = useState([])

    // const listItems = () => {
    //     fetch('https://holiday-wishlist-jj.ue.r.appspot.com/')
    //         .then(res => res.json())
    //         .then(setWishlist)
    //         .catch(console.error)
    // }

    // useEffect(listItems, [])

    return (
        <ItemContext.Provider value={{ wishlist, setWishlist }}>
            {children}
        </ItemContext.Provider>
    )
}