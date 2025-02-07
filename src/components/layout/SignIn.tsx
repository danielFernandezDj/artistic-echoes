"use client"

import { useSession, signIn, signOut } from "next-auth/react";
import { useForm, SubmitHandler } from "react-hook-form"

import { Heading, Text, Grid, Container, Button, TextField } from "@radix-ui/themes";
import { Mail, Key, X } from 'lucide-react';


type Inputs = {
    email: string
    password: string
}

export default function SignIn() {
    const { data: session } = useSession();

    const {
        register,
        handleSubmit,
        watch,
    } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

    console.log(watch("email")) // watch input value by passing the name of it


    return (
        <>
            {!session ? (
                <Container className="flex justify-center">
                    <form onSubmit={handleSubmit(onSubmit)} className="w-80 flex flex-col gap-3">
                        <Grid gap="4">
                            <Grid gap="2">
                                <TextField.Root
                                    placeholder="Email"
                                    {...register("email", { required: "Email is required" })}
                                >
                                    <TextField.Slot>
                                        <Mail height="16" width="16" />
                                    </TextField.Slot>
                                </TextField.Root>

                                <TextField.Root
                                    placeholder="Password"
                                    {...register("password", { required: "Password is required" })}
                                >
                                    <TextField.Slot>
                                        <Key height="16" width="16" />
                                    </TextField.Slot>
                                </TextField.Root>

                                <Button type="submit">
                                    Sign In
                                </Button>
                            </Grid>
                        </Grid>
                    </form>

                    <Heading>or</Heading>

                    {/* Auth-Providers */}
                    <Grid gap="2" className="my-2">
                        <button
                            onClick={() => signIn("google")}
                            className="p-1 border-2 rounded-md bg-blue-200"
                        >
                            Sign in with Google
                        </button>
                        <button
                            onClick={() => signIn("github")}
                            className="p-1 border-2 rounded-md bg-red-200"
                        >
                            Sign in with GitHub
                        </button>
                    </Grid>
                </Container>
            ) : (
                <div className="flex flex-col bg-white p-8 rounded-lg shadow-md w-96">
                    <h2 className="text-2xl font-bold mb-6 text-center">Welcome</h2>
                    <div>
                        <Text>You are signed in as {session.user?.name}.</Text>
                        <button onClick={() => signOut()}>Sign out</button>
                    </div>
                </div>
            )}
        </>
    )
}