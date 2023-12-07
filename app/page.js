import Header from '@/components/Header'
import Login from './login/Login'
// import giftGiving from '/giftGiving.jpeg'
import Image from 'next/image'


export default function Home() {
  return (
    <main className='bg-white h-screen'>
      
      <Header />
      
      <Login />
      {/* <Footer /> */}
    </main>
  )
}
