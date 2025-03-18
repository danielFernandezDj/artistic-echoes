"use client"

import { useSession, signOut } from "next-auth/react";
import { Button, Text } from "@radix-ui/themes";

export default function UserMenu() {
    const { data: session } = useSession();

    return (
        <div className="flex flex-col gap-2 bg-white p-8 rounded-lg shadow-md w-96">
            <Text>
               User content goes here.
            </Text>
        </div>
    )
}