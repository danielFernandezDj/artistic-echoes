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
        formState: { errors }
    } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

    console.log(watch("email")) // watch input value by passing the name of it.

    return (
        <>
            {!session ? (
                <Container>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
                        <Flex gap="3" direction="column" >
                            <div>
                                <Heading
                                    size="3"
                                    weight="medium"
                                    className="mb-2"
                                >
                                    Email
                                </Heading>
                                <TextField.Root
                                    variant="classic"
                                    placeholder="Email"
                                    className={errors.email ? "border border-red-500" : ""}
                                    {...register("email", { required: "Email is required" })}
                                >
                                    <TextField.Slot>
                                        <Mail height="16" width="16" />
                                    </TextField.Slot>
                                </TextField.Root>
                                {errors.email && <span className="text-red-600">This field is required</span>}
                            </div>

                            <div>
                                <Heading
                                    size="3"
                                    weight="medium"
                                    className="mb-2"
                                >
                                    Password
                                </Heading>
                                <TextField.Root
                                    variant="classic"
                                    placeholder="Password"
                                    className={errors.password ? "border border-red-500" : ""}
                                    {...register("password", { required: "Password is required" })}
                                >
                                    <TextField.Slot>
                                        <Key height="16" width="16" />
                                    </TextField.Slot>
                                </TextField.Root>
                                {errors.password && <span className="text-red-600">This field is required</span>}
                            </div>

                            <Button type="submit" className=" cursor-pointer bg-magenta-color">
                                Sign In
                            </Button>
                        </Flex>
                    </form>

                    <Heading size="4" className="w-full my-4 text-center">
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
                        <Text>You are signed as <span className="text-green-500">{session.user?.name}</span>.</Text> <br />
                        <Text>You are using <span className="text-blue-500">{session.user?.email}</span>.</Text>
                        <Button color="red" mt={"2"} onClick={() => signOut()}>Sign out</Button>
                    </div>
                </div>
            )}
        </>
    )
}