"use client";

import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { Button } from "@radix-ui/themes";
import NavAlertContent from "../layout/NavAlertContent";
import { useAuthModal } from "@/context/AuthModalContext";

export default function SignInButton() {
    const { isOpen, openModal } = useAuthModal();

    return (
        <AlertDialog.Root open={isOpen} >
            <AlertDialog.Trigger asChild>
                <Button
                    onClick={openModal}
                    className="cursor-pointer bg-magenta-color text-white shadow-lg shadow-magenta-color/50 font-mono px-4 py-2 rounded-md text-sm font-medium hover:bg-magenta-hover transition-colors"
                >
                    Sign In
                </Button>
            </AlertDialog.Trigger>

            <NavAlertContent />
        </AlertDialog.Root>
    );
};


