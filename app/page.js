import Header from '@/components/Header'
import Login from './login/Login'
import Footer from '@/components/Footer'


export default function Home() {
  return (
    <main className='bg-white h-screen justify-between'>
      <Login />
      <Footer/>
    </main>
  )
}
