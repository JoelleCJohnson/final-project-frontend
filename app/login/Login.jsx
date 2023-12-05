'use client'
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import { useContext, useState } from "react"
import { UserContext } from "@/context/UserContext"
import { useRouter } from 'next/navigation';

export default function Login() {

    const { token, setToken, loggedin, setLoggedIn } = useContext(UserContext)
    const [error, setError] = useState(null)

    const route = useRouter()

    const handleLogin = (token) => {
        if(token.message){
            setError(token.message)
            return
        }
        setToken(token)
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
            'https://holiday-wishlist-jj.ue.r.appspot.com/'
            // 'http://localhost:3001/'
            , {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(handleLogin)
            .catch(console.error)

    }

    return (
        <>
            <form className='mx-auto mb-0 mt-8 max-w-md space-y-4' onSubmit={handleFormSubmit}>
                <div className='mx-auto max-w-lg text-center'>
                    <h2 className='text-2xl font-bold sm:text-3xl'>Login:</h2>
                </div>

                <div>
                    <div className='mb-2 block'>
                        <Label htmlFor='email' value='Your email' />
                    </div>
                    <TextInput id='email' type='email' placeholder='name@email.com' required />
                </div>

                <div>
                    <div className='mb-2 block'>
                        <Label htmlFor='password' value='Your password' />
                    </div>
                    <TextInput id='password' type='password' required />
                </div>

                <div className='flex items-center gap-2'>
                    <Checkbox id='remember' />
                    <Label htmlFor='remember'>Remember me</Label>
                </div>

                <Button className='inline-block rounded-lg bg-red-600 px-32 md:px-48 py-3 text-sm font-medium text-zinc-50 hover:bg-green-100' type='submit'>Submit</Button>

                <p> Don't have an account? <a href='/signup'>Sign up</a>
                </p>
            </form>
        </>
    )
}