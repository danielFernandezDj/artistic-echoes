"use client"

import { useSession, signIn, signOut } from "next-auth/react";
import { useForm, SubmitHandler } from "react-hook-form"

import { Heading, Text, Flex, Container, Button, TextField } from "@radix-ui/themes";
import { Mail, Key, } from 'lucide-react';


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

    console.log(watch("email")) // watch input value by passing the name of it.


    return (
        <>
            {!session ? (
                <Container>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
                        <Flex gap="2" direction="column" >
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

                            <Button type="submit" className="cursor-pointer bg-magenta-color">
                                Sign In
                            </Button>
                        </Flex>
                    </form>

                    <Heading size="4" className="w-full mt-2 text-center">
                        or
                    </Heading>

                    {/* Auth-Providers */}
                    <Flex
                        gap="2"
                        align="center"
                        direction="column"
                        className="my-2"
                    >
                        <Button
                            color="blue"
                            onClick={() => signIn("google")}
                            className="p-1 w-full border-2 rounded-m cursor-pointer"
                        >
                            Sign in with Google
                        </Button>
                        <Button
                            color="red"
                            onClick={() => signIn("github")}
                            className="p-1 w-full border-2 rounded-md cursor-pointer"
                        >
                            Sign in with GitHub
                        </Button>
                    </Flex>
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