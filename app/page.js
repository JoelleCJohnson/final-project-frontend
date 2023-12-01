import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Dashboard from './dashboard/page'
import Signup from './signup/Signup'
import UserProvider from '@/context/UserContext'


export default function Home() {
  return (
    <UserProvider>
      <main className='bg-white'>
        <Header />
        <Signup />
        {/* <Footer /> */}
      </main>
    </UserProvider>
  )
}
