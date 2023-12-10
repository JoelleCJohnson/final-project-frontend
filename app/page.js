import Header from '@/components/Header'
import Login from './login/Login'
import Image from 'next/image'
import Footer from '@/components/Footer'


export default function Home() {
  return (
    <main className='bg-white h-screen justify-between'>
      {/* <Header /> */}
      <Login />
      <Footer className="flex align-end justify-end"/>
    </main>
  )
}
