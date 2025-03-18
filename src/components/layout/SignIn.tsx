"use client"

import { useSession, signIn } from "next-auth/react";
import { Flex, Container, Button, } from "@radix-ui/themes";
import UserMenu from "./UserMenu";

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
                <div>
                    <UserMenu />
                </div>

            )}
        </>
    )
}