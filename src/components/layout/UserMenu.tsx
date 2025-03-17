"use client"

import { useSession, signOut } from "next-auth/react";
import { Button, Text } from "@radix-ui/themes";

export default function UserMenu() {
    const { data: session } = useSession();

    return (
        <div className="flex flex-col bg-white p-8 rounded-lg shadow-md w-96">
            <h2 className="text-2xl font-bold mb-6 text-center">Welcome</h2>
            <div>
                <Text>You are signed as <span className="text-green-500">{session.user?.name}</span>.</Text> <br />
                <Text>You are using <span className="text-blue-500">{session.user?.email}</span>.</Text>
                <Button color="red" mt={"2"} onClick={() => signOut()}>Sign out</Button>
            </div>
        </div>
    )
}