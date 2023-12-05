import Header from '@/components/Header'
import LoginPage from './login/page'


export default function Home() {
  return (
      <main className='bg-white'>
        <Header />
        <LoginPage />
        {/* <Footer /> */}
      </main>
  )
}
