import AddItem from '@/app/additem/AddItem'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import CheckAuth from '../dashboard/CheckAuth'

export default function Dashboard() {

    return (
        <>
            <CheckAuth />
            <Header />
            <AddItem />
            <Footer />
        </>
    )
}