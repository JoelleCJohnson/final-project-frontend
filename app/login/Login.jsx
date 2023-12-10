'use client'
import { Button, Checkbox, Label, TextInput } from 'flowbite-react'
import { useContext, useState } from 'react'
import { UserContext } from '@/context/UserContext'
import { useRouter } from 'next/navigation'



export default function Login() {

    const { setToken } = useContext(UserContext)
    const [error, setError] = useState(null)

    const route = useRouter()

    const handleLogin = async (token) => {
        if (token.message) {
            setError(token.message)
            return
        }
        await setToken(token.token)
        console.log(token.token)
        setError()
        route.push('/dashboard')
    }

    const handleFormSubmit = (e) => {

        e.preventDefault()

        const formData = {
            email: e.target.email.value,
            password: e.target.password.value
        }

        fetch(
            'https://holiday-wishlist-jj.ue.r.appspot.com/login'
            , {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(res => res.json())
            .then(handleLogin)
            .catch(console.error)

    }

    return (
        <main className='flex justify-between max-w-auto h-auto bg-zinc-50'>

            <form className='m-24 w-1/2 min-w-max content-center justify-center items-center' onSubmit={handleFormSubmit}>
                <div className='mx-auto max-w-lg text-center'>
                    <h2 className='text-2xl font-bold sm:text-3xl mb-4'>Login:</h2>
                    <p> Don't have an account? <a href='/signup' className='text-blue-600 underline'>Sign up</a></p>
                </div>

                <div className='mb-2'>
                    <div className='mb-2 block'>
                        <Label htmlFor='email' value='Email:' />
                    </div>
                    <TextInput id='email' name='email' type='email' placeholder='name@email.com' required shadow />
                </div>

                <div className='mb-2'>
                    <div className='mb-2 block'>
                        <Label htmlFor='password' value='Password:' />
                    </div>
                    <TextInput id='password' name='password' type='password' placeholder='Password' required shadow />
                </div>

                <div className='flex items-center gap-2 mb-2'>
                    <Checkbox id='remember' />
                    <Label htmlFor='remember'>Remember me</Label>
                </div>

                <Button className='mt-4 bg-white text-red-500 border border-2 border-green-500 w-full hover:!bg-green-700 hover:!text-zinc-50 shadow' type='submit'>Submit</Button>

            </form>
            <section className='gift-photo h-auto  w-1/2 sm:block hidden min-w-max object-fill'></section>
        </main>
    )
}