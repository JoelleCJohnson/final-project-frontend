import Header from '@/components/Header'
import Login from './login/Login'
import giftGiving from 'public/giftGiving.jpeg'
import Image from 'next/image'


export default function Home() {
  return (
      <main className='bg-white'>
        <Header />
        <Login />
        <img src={giftGiving} />
        {/* <Footer /> */}
      </main>
  )
}
