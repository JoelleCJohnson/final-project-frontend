'use client'
import { useContext } from 'react'
import { UserContext } from '@/context/UserContext'
import { useRouter, usePathname } from 'next/navigation'
import { Button } from 'antd'
import Image from 'next/image'

export default function Header() {
    const { token } = useContext(UserContext)

    const route = useRouter()
    const pathname = usePathname()

    return (
        <header className='flex justify-between text-center bg-red-700'>
            
            <div className='p-8 lg:items-center'>
                <Image src='/Wishlily.png' width={190} height={0} alt='WishLily logo written in script' />
            </div>

            <div className='pt-10 pr-6'>
                {((token && pathname.startsWith('/add')) || (token && pathname.startsWith('/share'))) &&
                    <>
                        <Button
                            className='m-4 bg-zinc-50 text-red-700 shadow text-xs rounded-3xl p-x-2 hover:!text-red-700 hover:!font-bold hover:!border-red-700'
                            onClick={()=> {
                                route.push('/dashboard')
                            }}
                            >
                                My Wishlist
                        </Button>

                        <Button
                            className='m-4 bg-zinc-50 text-red-700 shadow text-xs rounded-3xl p-x-2 hover:!text-red-700 hover:!font-bold hover:!border-red-700'
                            onClick={() => {
                                sessionStorage.clear()
                                route.push('/')
                            }}>
                            Log out
                        </Button>
                    </>}

                    {(token && pathname.startsWith('/dash')) &&
                    <>
                        <Button
                            className='m-4 bg-zinc-50 text-red-700 shadow text-xs rounded-3xl p-x-2 hover:!text-red-700 hover:!font-bold hover:!border-red-700'
                            onClick={()=> {
                                route.push('/additem')
                            }}
                            >
                                Add Item
                        </Button>

                        <Button
                            className='m-4 bg-zinc-50 text-red-700 shadow text-xs rounded-3xl p-x-2 hover:!text-red-700 hover:!font-bold hover:!border-red-700'
                            onClick={() => {
                                sessionStorage.clear()
                                route.push('/')
                            }}>
                            Log out
                        </Button>
                    </>
                }
            </div>

        </header>
    )
}