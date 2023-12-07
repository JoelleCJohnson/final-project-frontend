import Header from '@/components/Header'
import Login from './login/Login'


export default function Home() {
  return (
      <main className='bg-white'>
        <Header />
        <Login />
        {/* <Footer /> */}
      </main>
  )
}
