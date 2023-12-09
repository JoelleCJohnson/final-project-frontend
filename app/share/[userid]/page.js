
import Header from "@/components/Header"
import Share from "./Share"
import Footer from "@/components/Footer"


export default function SharePage({ params: {userid}}) {
    return (
        <>
        <Header />
        <Share userid={userid}/>
        <Footer />
        </>
    )
}