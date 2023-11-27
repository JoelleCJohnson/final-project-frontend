import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Dashboard from './dashboard/page'


export default function Home() {
  return (
    <main>
      <Header />
      <Dashboard />
      {/* <Footer /> */}
    </main>
  )
}
