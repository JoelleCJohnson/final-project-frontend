import Header from '@/components/Header'
import UserProvider from '@/context/UserContext'
import LoginPage from './login/page'


export default function Home() {
  return (
    <UserProvider>
      <main className='bg-white'>
        <Header />
        <LoginPage />
        {/* <Footer /> */}
      </main>
    </UserProvider>
  )
}
