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
        <header className='flex justify-between text-center bg-zinc-50'>
            
            <div>
                <Image src='/RedWishLily.png' width={190} height={0} alt='WishLily logo written in script' />
            </div>

            <div className='w-1/3 sm:flex justify-end items-center'>
                {((token && pathname.startsWith('/add')) || (token && pathname.startsWith('/share'))) &&
                    <>
                        <Button
                            className='m-2 bg-zinc-50 text-red-700 shadow text-xs font-bold rounded-3xl p-x-2 hover:!text-red-700 hover:!font-extrabold hover:!border-red-700'
                            onClick={()=> {
                                route.push('/dashboard')
                            }}
                            >
                                My Wishlist
                        </Button>

                        <Button
                            className='m-2 bg-zinc-50 text-red-700 shadow text-xs font-bold rounded-3xl p-x-2 hover:!text-red-700 hover:!font-extrabold hover:!border-red-700'
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
                            className='m-2 max-h-10 bg-zinc-50 text-red-700 shadow text-xs font-bold rounded-3xl p-x-2 hover:!text-red-700 hover:!font-extrabold hover:!border-red-700'
                            onClick={()=> {
                                route.push('/additem')
                            }}
                            >
                                Add Item
                        </Button>

                        <Button
                            className='m-2 bg-zinc-50 text-red-700 shadow text-xs font-bold rounded-3xl p-x-2 hover:!text-red-700 hover:!font-extrabold hover:!border-red-700'
                            onClick={() => {
                                sessionStorage.clear()
                                route.push('/')
                            }}>
                            Log out
                        </Button>
                    </>
                }
                {(!token && pathname.startsWith('/login')) &&
                    <>
                    <Button
                            className='m-2 bg-zinc-50 text-red-700 shadow text-xs font-bold rounded-3xl p-x-2 hover:!text-red-700 hover:!font-extrabold hover:!border-red-700'
                            onClick={()=> {
                                route.push('/')
                            }}
                            >
                                Log in
                        </Button>
                    </>
                }
                {(!token && pathname === '/') &&
                    <>
                    <Button
                            className='m-2 bg-zinc-50 text-red-700 shadow text-xs font-bold rounded-3xl p-x-2 hover:!text-red-700 hover:!font-extrabold hover:!border-red-700'
                            onClick={()=> {
                                route.push('/signup')
                            }}
                            >
                                Sign Up
                        </Button>
                    </>
                }
            </div>

        </header>
    )
}