"use client"

import { AlertDialog, Flex, Button } from "@radix-ui/themes"
import { useAuthModal } from "@/context/AuthModalContext"
import SignIn from "@/components/layout/SignIn"
import { X } from "lucide-react"
import { useSession, signOut } from "next-auth/react";

export default function NavAlertContent() {
    const { closeModal } = useAuthModal()
    const { data: session } = useSession()

    return (
        <>
            <AlertDialog.Content className="flex flex-col gap-4">

                <Flex justify="between" align="center">
                    {session ? (
                        <AlertDialog.Title className="flex flex-col gap-2">
                            <span className="text-base font-semibold"> Welcome! </span>
                            <span className="text-magenta-color">
                                {session?.user?.name}
                            </span>
                            <Button
                                color="red"
                                onClick={() => signOut()}
                            >
                                Sign out
                            </Button>
                        </AlertDialog.Title>
                    ) : (
                        <Flex
                            as="div"
                            display="flex"
                            direction="column"
                            justify="center"
                            className="w-full text-center"
                        >
                            <AlertDialog.Title
                                className="text-xl font-semibold"
                            >
                                You&apos;re not signed in.
                            </AlertDialog.Title>
                            <AlertDialog.Description
                                className="text-sm -mt-2 text-gray-500"
                            >
                                Log-in to view your favorite images and save your preferences.
                            </AlertDialog.Description>
                        </Flex>
                    )}

                    <div className="absolute top-6 right-4">
                        <AlertDialog.Cancel
                            onClick={closeModal}
                            className="text-red-500 relative -top-1.5 cursor-pointer hover:rotate-90 transition ease-in-out duration-300"
                        >
                            <X size={32} />
                        </AlertDialog.Cancel>
                    </div>
                </Flex>

                <SignIn />
                <AlertDialog.Description className="text-center text-sm text-gray-500">
                    You can sign in using your credentials or create a new account to get started.
                </AlertDialog.Description>
            </AlertDialog.Content >
        </>
    )
}