"use client"

// import React, { useState } from "react"
import { useSession, signIn, signOut } from "next-auth/react";
import Footer from "@/components/layout/Footer"
import Container from "@/components/layout/Container"
// import { useForm } from 'react-hook-form';


export default function SignUp() {
    const { data: session } = useSession();


    return (
        <Container
            size="full"
            position="static"
            className="flex flex-col justify-center items-center bg-blue-400"
        >
            <Container
                size="full"
                position="relative"
                className="flex flex-col justify-center items-center bg-blue-400"
            >
                {!session ? (
                    <div className="flex flex-col bg-white p-8 rounded-lg shadow-md w-96">
                        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                        <div className="flex flex-col gap-4 text-center">
                            <p>You are not signed in.</p>
                            <button onClick={() => signIn("github")}>Sign in with GitHub</button>
                            <button onClick={() => signIn("google")}>Sign in with Google</button>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col bg-white p-8 rounded-lg shadow-md w-96">
                        <h2 className="text-2xl font-bold mb-6 text-center">Welcome</h2>
                        <div>
                            <p>You are signed in as {session.user?.name}.</p>
                            <button onClick={() => signOut()}>Sign out</button>
                        </div>
                    </div>
                )}
            </Container>

            <Footer />
        </Container >
    )
}

{/* <form>
                            <label htmlFor="name">
                                Name
                            </label>
                            <input type="name" placeholder="Enter your Name" />

                            <label htmlFor="gmail">
                                eMail
                            </label>
                            <input type="gmail" placeholder="Enter your eMail" />

                            <label htmlFor="password">
                                Password
                            </label>
                            <input type="password" placeholder="Enter your Password" />

                            <button
                                type="submit"
                               
                                className="p-3 bg-orange-600 rounded-md hover:bg-orange-500 font-bold"
                            >
                                LogIn
                            </button>
                        </form> */}