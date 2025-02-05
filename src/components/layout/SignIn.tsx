"use client"

import { useState } from "react"
import { useSession, signIn, signOut } from "next-auth/react";
import { useForm, SubmitHandler } from "react-hook-form"
import { useRouter } from "next/navigation";

import { Heading, Text, Grid, Flex, Container, Box, Theme, Button, TextField } from "@radix-ui/themes";
import { Mail, Key } from 'lucide-react';

type Inputs = {
    email: string
    password: string
}

export default function SignIn() {
    // const { data: session } = useSession();

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    // if (error) {
    //     return ("We get and error! :)")
    // }

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setError(null); // Reset error state

        const result = await signIn("credentials", {
            redirect: false,
            email: data.email,
            password: data.password,
        });

        if (result?.error) {
            setError(result.error); // Display authentication error
        } else {
            router.push("/dashboard"); // Redirect after successful login
        }
    };


    return (
        <>
            <Container>
                <form onSubmit={handleSubmit(onSubmit)} className="w-80 flex flex-col gap-3">
                    {error && <p className="text-red-500">{error}</p>}

                    <Grid gap="4">
                        <Heading>
                            Sign In
                        </Heading>

                        <Grid gap="2">
                            <TextField.Root
                                placeholder="Email"
                                {...register("email", { required: "Email is required" })}
                            >
                                <TextField.Slot>
                                    <Mail height="16" width="16" />
                                </TextField.Slot>
                            </TextField.Root>
                            {errors.email && <p className="text-red-500">{errors.email.message}</p>}

                            <TextField.Root
                                placeholder="Password"
                                {...register("password", { required: "Password is required" })}
                            >
                                <TextField.Slot>
                                    <Key height="16" width="16" />
                                </TextField.Slot>
                            </TextField.Root>
                            {errors.password && <p className="text-red-500">{errors.password.message}</p>}

                            <Button type="submit">
                                Sign In
                            </Button>
                        </Grid>
                    </Grid>
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