'use client'
import Signup from "./Signup";
import Login from "./Login";

export default function LoginPage() {

    return (
        <section className="flex flex-row justify-center">
            <Signup />
            <Login />
        </section>
    )
}