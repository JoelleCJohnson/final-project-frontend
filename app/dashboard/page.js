
import AddItem from '@/app/dashboard/AddItem'
import DisplayWishlist from '@/app/dashboard/DisplayWishList'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Image from 'next/image'

export default function Dashboard() {

    return (
        <>
            <section className='relative'>
                <Header />
                    <div className='relative'>
                <section className='flex flex-row'>
                        {/* <Image src={"/caley-dimmock-_HCpwe1-Prc-unsplash.jpg"} alt="gifts in brown wrapping paper"  layout="fill" priority={true}/> */}
                    <DisplayWishlist />
                    <AddItem />
                </section>
                    </div>
            </section>
            <Footer />
        </>
    )
}