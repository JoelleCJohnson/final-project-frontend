"use client"
import { createContext, useState } from "react"

export const ItemContext = createContext(null)

export default function ItemsContext({ children }) {

    const [wishlist, setWishlist] = useState([])
    const [itemDetails, setItemDetails] = useState()

    return (
        <ItemContext.Provider value={{ wishlist, setWishlist, itemDetails, setItemDetails }}>
            {children}
        </ItemContext.Provider>
    )
}