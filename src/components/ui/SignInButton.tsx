"use client";

import React, { useState } from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { Button } from "@radix-ui/themes";
import NavAlertContent from "../layout/NavAlertContent";

export default function SignInButton() {
    const [isAlertOpen, setIsAlertOpen] = useState(false);

    return (
        <AlertDialog.Root open={isAlertOpen} onOpenChange={setIsAlertOpen}>
            <AlertDialog.Trigger asChild>
                <Button
                    onClick={() => setIsAlertOpen(true)}
                    className="cursor-pointer bg-magenta-color text-white shadow-lg shadow-magenta-color/50 font-mono px-4 py-2 rounded-md text-sm font-medium hover:bg-magenta-hover transition-colors"
                >
                    Sign In
                </Button>
            </AlertDialog.Trigger>

            {/* Sign-In Alert Content */}
            <AlertDialog.Content>
                <NavAlertContent />
            </AlertDialog.Content>
        </AlertDialog.Root>
    );
};


