"use client"

import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/layout/NavBar"
import { SessionProvider } from "next-auth/react";
// import Providers from "@/provider/Providers";
import { AuthModalProvider } from "@/context/AuthModalContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
  session,
}: Readonly<{
  children: React.ReactNode;
  session: never;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-auto flex flex-col overflow-auto`}
      >
        <SessionProvider session={session}>
          <AuthModalProvider>
            <Theme>
              <Navbar />
              <main className="flex-grow">{children}</main>
              <div className="fixed inset-0 -z-10 w-full h-full opacity-25 pattern-bg"></div>
            </Theme>
          </AuthModalProvider>
        </SessionProvider>
      </body>
    </html>
  );
}