'use client'
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import { useContext } from "react"
import { UserContext } from "@/context/UserContext"

export default function Login() {

    const { token, setToken, loggedin, setLoggedIn } = useContext(UserContext)

    return (
        <form className="flex max-w-md flex-col gap-4 m-4 bg-red-600 p-4 rounded-lg">
            <h2 className='flex justify-center text-white'>Login:</h2>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="email" value="Your email" />
                </div>
                <TextInput id="email" type="email" placeholder="name@email.com" required />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="password" value="Your password" />
                </div>
                <TextInput id="password" type="password" required />
            </div>
            <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">Remember me</Label>
            </div>

            <Button className="bg-white text-red-500 border border-2 hover:text-white hover:border-gray-300 border-green-300" type="submit">Submit</Button>
        </form>
    )
}