"use client"
import { createContext, useState } from "react"

export const ItemContext = createContext(null)

export default function ItemsContext({ children }) {

    const [wishlist, setWishlist] = useState([])
    const [show, setShow] = useState(false)

    return (
        <ItemContext.Provider value={{ wishlist, setWishlist }}>
            {children}
        </ItemContext.Provider>
    )
}