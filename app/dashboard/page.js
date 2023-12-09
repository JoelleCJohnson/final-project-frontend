
import AddItem from '@/app/dashboard/AddItem'
import DisplayWishlist from '@/app/dashboard/DisplayWishList'
import Header from '@/components/Header'
import Image from 'next/image'

export default function Dashboard() {

    return (
        <>
        <section className='relative'> 
        <Header />
            <section className='flex flex-row relative'>
                <div className='relative'>
        <Image src={"/caley-dimmock-_HCpwe1-Prc-unsplash.jpg"} alt="gifts in brown wrapping paper"  layout="fill"/>

                <DisplayWishlist />
                </div>
                <AddItem />
            </section>
        </section>
        </>
    )
}