"use client"

import { useSession } from "next-auth/react";
import { Text } from "@radix-ui/themes";

export default function UserMenu() {
    const { data: session } = useSession();

    return (
        <div className="flex flex-col gap-2 bg-white p-8 rounded-lg shadow-md">
            <Text>
               User content goes here.
            </Text>

           
        </div>
    )
}