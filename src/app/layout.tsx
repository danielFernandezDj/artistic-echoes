import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/layout/NavBar"
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Artistic Echoes",
  description: "Artistic Echoes is a platform for artists to showcase their work and connect with their audience.",
  icons: {
    icon: "/images/icons.svg",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        {/* <footer className="flex justify-center items-center w-full h-auto py-5 text-white bg-blue-500">
          <p>
            ©2024 All rights reserved - Designed & Coded by Daniel Fernandez
          </p>
        </footer> */}
        <div className="fixed inset-0 -z-10 w-full h-full opacity-25 pattern-bg"></div>
      </body>
    </html>
  );
}
