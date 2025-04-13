"use client"

import { useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { Flex, Container, Button, } from "@radix-ui/themes";
import UserMenu from "./UserContentMenu";

export default function SignIn() {
    const { data: session } = useSession();

    useEffect(() => {
        const saveUser = async () => {
            if (!session?.user?.email) return;

            await fetch('/api/save-user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: session?.user?.email,
                }),
            });
        };

        saveUser();
    }, [session]);

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