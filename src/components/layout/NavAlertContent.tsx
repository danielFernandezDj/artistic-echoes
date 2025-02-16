"use client"

import { AlertDialog, Flex } from "@radix-ui/themes"
import { useAuthModal } from "@/context/AuthModalContext"
import SignIn from "@/components/layout/SignIn"
import { X } from "lucide-react"

export default function NavAlertContent() {
    const { closeModal } = useAuthModal()
    return (
        <>
            <AlertDialog.Content maxWidth="400px">
                <Flex className='mb-4' justify="between" align="center">
                    <AlertDialog.Title>
                        Sign In
                    </AlertDialog.Title>
                    <AlertDialog.Cancel
                        onClick={closeModal}
                        className="text-red-500 relative bottom-2 cursor-pointer hover:rotate-90 transition ease-in-out duration-300"
                    >
                        <X size={32} />
                    </AlertDialog.Cancel>
                </Flex>

                <SignIn />
            </AlertDialog.Content>
        </>
    )
}