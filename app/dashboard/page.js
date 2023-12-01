
import AddItem from '@/app/dashboard/AddItem'
import DisplayWishlist from '@/app/dashboard/DisplayWishList'
import Header from '@/components/Header'

export default function Dashboard() {

    return (
        <section className='bg-white'> 
        <Header />
            <section className='flex flex-row'>
                <DisplayWishlist />
                <AddItem />
            </section>
        </section>
    )
}