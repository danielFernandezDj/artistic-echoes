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

    return (
        <>
            {!session ? (
                <Container>
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