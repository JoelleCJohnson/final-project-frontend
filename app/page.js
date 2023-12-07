import Header from '@/components/Header'
import Login from './login/Login'
// import giftGiving from '/giftGiving.jpeg'
import Image from 'next/image'


export default function Home() {
  return (
    <main className='bg-white h-screen'>
      <div className="absolute inset-0">
      <Header />
      </div>
      <Login />
      {/* <Footer /> */}
    </main>
  )
}
