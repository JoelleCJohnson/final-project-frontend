import DisplayWishlist from "@/app/dashboard/DisplayWishList"
import AddItem from "@/app/dashboard/AddItem"

export default function DashboardLayout({ children }){
    return(
        <main >
            {children}
        </main>
    )
}