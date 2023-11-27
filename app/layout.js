import { Inter } from 'next/font/google'
import './globals.css'
import ItemsContext from '@/context/listContext/ItemsContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'My Wishlist',
  description: 'This is my holiday wishlist!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ItemsContext>
          {children}
        </ItemsContext>
      </body>
    </html>
  )
}
