import DisplayWishlist from "@/app/dashboard/DisplayWishList"
import AddItem from "@/app/dashboard/AddItem"

export default function DashboardLayout({ children }){
    return(
        <main className="mx-auto bg-zinc-500 p-5">
            {children}
        </main>
    )
}