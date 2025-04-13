"use client";

import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { Button, Avatar } from "@radix-ui/themes";
import NavAlertContent from "../layout/NavAlertContent";
import { useAuthModal } from "@/context/AuthModalContext";
import { useSession } from "next-auth/react";
import { Text, Flex } from "@radix-ui/themes";

export default function SignInButton() {
    const { isOpen, openModal } = useAuthModal();
    const { data: session } = useSession();

    const userInitials = session?.user?.name
        ? session.user.name.split(' ').map((n: string) => n[0]).join('')
        : 'A';

    return (
        <AlertDialog.Root open={isOpen} >
            <AlertDialog.Trigger asChild>
                {session
                    ? (<Flex
                        onClick={openModal}
                        gap={"2"}
                        align={"center"}
                        justify={"center"}
                        className="cursor-pointer"
                    >
                        <Avatar
                            variant="solid"
                            radius="medium"
                            color="iris"
                            fallback={`${userInitials}`}
                        />
                        <Text className='font-mono text-xl text-gray-800 lg:hidden'>
                            {session?.user?.name}
                        </Text>
                    </Flex>)
                    : (<Button
                        onClick={openModal}
                        className="cursor-pointer bg-magenta-color text-white shadow-lg shadow-magenta-color/50 font-mono px-4 py-2 rounded-md text-sm font-medium hover:bg-magenta-hover transition-colors"
                    >
                        Sign In
                    </Button>)
                }
            </AlertDialog.Trigger>

            <NavAlertContent />
        </AlertDialog.Root >
    );
};


