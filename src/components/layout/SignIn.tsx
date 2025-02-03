"use client"

// import React, { useState } from "react"
// import { useSession, signIn, signOut } from "next-auth/react";
import { useForm, SubmitHandler } from "react-hook-form"
import { Heading, Text, Flex, Container, Box, Theme, Button, TextField } from "@radix-ui/themes";
import { Mail, Lock } from 'lucide-react';

type Inputs = {
    example: string
    exampleRequired: string
}

export default function SignUp() {
    // const { data: session } = useSession();
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

    console.log(watch("example"))

    return (
        <>
            <Container>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Flex>
                        <Heading>

                        </Heading>
                        <Box>
                            <TextField.Root
                                placeholder="Insert your eMail"
                                defaultValue="test" {...register("example")}
                            >
                                <TextField.Slot>
                                    <Mail height="16" width="16" />
                                </TextField.Slot>
                            </TextField.Root>

                            <TextField.Root
                                placeholder="Insert your Password"
                                {...register("exampleRequired", { required: true })}
                            >
                                <TextField.Slot>
                                    <Lock height="16" width="16" />
                                </TextField.Slot>
                            </TextField.Root>
                            {errors.exampleRequired && <span>This field is required</span>}

                            <Button type="submit">
                                Signin
                            </Button>
                        </Box>
                    </Flex>
                </form>
            </Container>
        </>
    )
}

// const { data: session } = useSession();
// const [email, setEmail] = useState("");
// const [password, setPassword] = useState("");
// const [error, setError] = useState("");

// const handleSignIn = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const result = await signIn("credentials", {
//         redirect: false,
//         email,
//         password,
//     });

//     if (result?.error) {
//         setError(result.error)
//     } else {
//         window.location.href = "/dashboard";
//     }
// }


{/* <Container
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
                <form onSubmit={handleSignIn} className="flex flex-col gap-4">
                    {error && <p className="text-red-500">{error}</p>}
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border p-2"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border p-2"
                    />
                    <button
                        type="submit"
                        className="p-2 bg-blue-500 text-white rounded"
                    >
                        Sign In
                    </button>
                </form>

                {/* Auth-Providers */}
{/* <div className="flex flex-col gap-4 text-center">
    <p>You are not signed in.</p>
    <button onClick={() => signIn("google")}>Sign in with Google</button>
    <button onClick={() => signIn("github")}>Sign in with GitHub</button>
</div>
            </div >
        ) : (
    <div className="flex flex-col bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Welcome</h2>
        <div>
            <p>You are signed in as {session.user?.name}.</p>
            <button onClick={() => signOut()}>Sign out</button>
        </div>
    </div>
)}
    </Container >

</Container > */}

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