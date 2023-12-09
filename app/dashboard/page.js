
import AddItem from '@/app/dashboard/AddItem'
import DisplayWishlist from '@/app/dashboard/DisplayWishList'
import Header from '@/components/Header'
import Image from 'next/image'

export default function Dashboard() {

    return (
        <section className='bg-white'> 
        <Header />
        <Image src={"/caley-dimmock-_HCpwe1-Prc-unsplash.jpg"} alt="gifts in brown wrapping paper" height={500} width={500} />
            <section className='flex flex-row'>
                <DisplayWishlist />
                <AddItem />
            </section>
        </section>
    )
}