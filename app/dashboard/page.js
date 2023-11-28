
import AddItem from '@/app/dashboard/AddItem'
import DisplayWishlist from '@/app/dashboard/DisplayWishList'

export default function Dashboard(){

    return(
        <section className='flex flex-row'>
            <DisplayWishlist />
            <AddItem/>
        </section>
    )
}