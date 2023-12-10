import AddItem from '@/app/additem/AddItem'
import DisplayWishlist from '@/app/dashboard/DisplayWishList'
import Footer from '@/components/Footer'
import Header from '@/components/Header'

export default function Dashboard() {

    return (
        <>
            <Header />
            <DisplayWishlist />
            <Footer />
        </>
    )
}