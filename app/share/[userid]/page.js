
import Header from "@/components/Header"
import Share from "./Share"
import Footer from "@/components/Footer"
import CheckAuth from "@/app/dashboard/CheckAuth"


export default function SharePage({ params: {userid}}) {
    return (
        <>
        <CheckAuth />
        <Header />
        <Share userid={userid}/>
        <Footer />
        </>
    )
}