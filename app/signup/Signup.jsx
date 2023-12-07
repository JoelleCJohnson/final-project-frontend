'use client'
import { useContext } from "react"
import { UserContext } from '@/context/UserContext';
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import Link from 'next/link';
import { useRouter } from "next/navigation";

export default function Signup() {

  const { setToken } = useContext(UserContext)

  const route = useRouter()

  const handleSignUp = (token) => {
    console.log("handling signup")
    setToken(token.token)
    setLoggedIn(true)
    route.push('/dashboard')
  }

  const handleFormSubmit = (e) => {

    e.preventDefault()

    const formData = {
      email: e.target.email2.value,
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      streetAddress: e.target.streetAddress.value,
      city: e.target.city.value,
      state: e.target.state.value,
      zipCode: e.target.zipCode.value,
      password: e.target.password2.value
      // passCheck: e.target.repeat-password.value
    }

    console.log(formData)
    fetch(
      'https://holiday-wishlist-jj.ue.r.appspot.com/signup'
      // 'http://localhost:3001/signup'
      , {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then(res => res.json())
      .then(handleSignUp)
      .catch(alert)
  }

  return (
    <form className='mx-auto mb-0 mt-8 max-w-md space-y-4' onSubmit={handleFormSubmit}>
      <div className='mx-auto max-w-lg text-center'>
        <h2 className="text-2xl font-bold sm:text-3xl">Sign Up:</h2>
        <p className="text-center">Already have an account? <a href='/' className="text-blue-600 underline">Log in</a></p>
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="email2" value="Your Email" />
        </div>
        <TextInput id="email2" type="email" placeholder="name@email.com" required shadow />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="firstName" value="First Name" />
        </div>
        <TextInput id="firstName" type="text" placeholder="First Name" required shadow />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="lastName" value="Last Name" />
        </div>
        <TextInput id="lastName" type="text" placeholder="Last Name" required shadow />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="streetAddress" value="Address" />
        </div>
        <TextInput id="streetAddress" type="text" placeholder="Street Address" required shadow />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="city" value="City" />
        </div>
        <TextInput id="city" type="text" placeholder="City" required shadow />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="state" value="State" />
        </div>
        <TextInput id="state" type="text" placeholder="State (2 letters)" required shadow />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="zipCode" value="Zip Code" />
        </div>
        <TextInput id="zipCode" type="text" placeholder="Zip Code" required shadow />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="password2" value="Your Password" />
        </div>
        <TextInput id="password2" type="password" required shadow />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="repeat-password" value="Repeat Password" />
        </div>
        <TextInput id="repeat-password" type="password" required shadow />
      </div>

      <div className="flex items-center gap-2">
        <Checkbox id="agree" />
        <Label htmlFor="agree" className="flex">
          I agree with the&nbsp;
          <Link href="#" className="text-green-400 hover:underline dark:text-cyan-500">
            terms and conditions
          </Link>
        </Label>
      </div>

      <Button className="bg-white text-red-500 border border-2 hover:text-white hover:border-gray-300 border-green-300 w-full" type="submit">Register new account</Button>
    </form>
  );
}
