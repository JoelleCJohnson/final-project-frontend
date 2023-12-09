'use client'
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import { useContext, useState } from "react"
import { UserContext } from "@/context/UserContext"
import { useRouter } from 'next/navigation';



export default function Login() {

    const { setToken } = useContext(UserContext)
    const [error, setError] = useState(null)

    const route = useRouter()

    const handleLogin = async (token) => {
        if(token.message){
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
            // 'http://localhost:3001/login'
            , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // mode: 'no-cors',
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(handleLogin)
            .catch(console.error)

    }

    return (
        <main className="relative flex flex-row justify-end max-w-xl h-80">
             
            <form className='mx-auto mb-0 mt-8 max-w-md space-y-4' onSubmit={handleFormSubmit}>
                <div className='mx-auto max-w-lg text-center'>
                    <h2 className='text-2xl font-bold sm:text-3xl'>Login:</h2>
                </div>

                <div>
                    <div className='mb-2 block'>
                        <Label htmlFor='email' value='Email:' />
                    </div>
                    <TextInput id='email' name='email' type='email' placeholder='name@email.com' required />
                </div>

                <div>
                    <div className='mb-2 block'>
                        <Label htmlFor='password' value='Password:' />
                    </div>
                    <TextInput id='password' name='password' type='password' required />
                </div>

                <div className='flex items-center gap-2'>
                    <Checkbox id='remember' />
                    <Label htmlFor='remember'>Remember me</Label>
                </div>

                <Button className="bg-white text-red-500 border border-2 hover:text-white hover:border-gray-300 border-green-300 w-full" type='submit'>Submit</Button>

                <p> Don't have an account? <a href='/signup' className='text-blue-600 underline'>Sign up</a>
                </p>
            </form>
            <section className='gift-photo w-screen'>please</section>
        </main>
    )
}