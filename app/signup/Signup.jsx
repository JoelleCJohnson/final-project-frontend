'use client'

import { useContext } from "react"
import { userContext } from '@/context/UserContext';
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import Link from 'next/link';
import { useRouter } from "next/navigation";

export default function Signup() {

    const { setToken, setLoggedIn } = useContext(userContext)

    const route = useRouter()

    const handleSignUp = (token) => {
        setToken(token.token)
        localStorage.setItem('login', true)
        route.push('/dashboard')
    }

    const handleFormSubmit = (e) => {

        //generate token

        e.preventDefault()
        const formData = {
            email: e.target.email2.value,
            firstName: e.target.firstName.value,
            lastName: e.target.lastName.value,
            streetAddress: e.target.streetAddress.value,
            city: e.target.city.value,
            state: e.target.state.value,
            zipCode: e.target.zipCode.value,
            password: e.target.password2.value,
            passCheck: e.target.repeat-password.value
        }

        fetch('https://holiday-wishlist-jj.ue.r.appspot.com/', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(handleSignUp)
            .catch(alert)
    }

  return (
    <form className="flex max-w-md flex-col gap-4" onSubmit={handleFormSubmit}>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="email2" value="Your email" />
        </div>
        <TextInput id="email2" type="email" placeholder="name@flowbite.com" required shadow />
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
          <Label htmlFor="city" value="city" />
        </div>
        <TextInput id="city" type="text" placeholder="City" required shadow />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="state" value="state" />
        </div>
        <TextInput id="state" type="text" placeholder="State (2 letters)" required shadow />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="zipCode" value="zip code" />
        </div>
        <TextInput id="zipCode" type="text" placeholder="zip code" required shadow />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="password2" value="Your password" />
        </div>
        <TextInput id="password2" type="password" required shadow />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="repeat-password" value="Repeat password" />
        </div>
        <TextInput id="repeat-password" type="password" required shadow />
      </div>

      <div className="flex items-center gap-2">
        <Checkbox id="agree" />
        <Label htmlFor="agree" className="flex">
          I agree with the&nbsp;
          <Link href="#" className="text-cyan-600 hover:underline dark:text-cyan-500">
            terms and conditions
          </Link>
        </Label>
      </div>

      <Button type="submit">Register new account</Button>
    </form>
  );
}
