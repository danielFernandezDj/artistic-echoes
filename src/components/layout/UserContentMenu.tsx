"use client"

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Text } from "@radix-ui/themes";
import Image from "next/image";
import { ImageStock } from "@/lib/ImageStockType";

export default function UserMenu() {
    const { data: session } = useSession();
    const [imageIDs, setImageIds] = useState<string[]>([])
    const [loading, setLoading] = useState<boolean>(true);
    const [images, setImages] = useState<ImageStock[]>([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                setLoading(true);
                if (!session?.user?.email) return;

                const userResponse = await fetch('/api/get-user-liked-img')
                const newData = await userResponse.json()

                setImageIds(Array.isArray(newData.imageID) ? newData.imageID : [])

                const userEmail = session?.user?.email;
                if (!userEmail) {
                    throw new Error("User email not found");
                }

                const response = await fetch(`/api/get-user-images?userEmail=${encodeURIComponent(userEmail)}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch images: ${response.status}`);
                }
                const data = await response.json();

                setImages(data);

                console.log('Images loaded:', data)
            } catch (error) {
                console.error("Error fetching images:", error);

            } finally {
                setLoading(false);
            }
        }

        fetchImages();
    }, [session?.user?.email]);

    if (loading) {
        return (
            <div className="container mx-auto p-4">
                <div className="grid place-items-center h-screen">
                    <p className="animate-pulse text-2xl p-2 bg-red-200 rounded-md">Loading gallery...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-2">
            {session && (
                <div className="flex flex-col gap-4">
                    <Text weight={"medium"}>
                        Total: {imageIDs.length}
                    </Text>
                    <div className="columns-1 md:columns-2 lg:columns-3 gap-6 ">
                        {images.map((image, index) => (
                            <div key={index} className="flex items-center p-5 md:mb-5 md:p-0">
                                <Image
                                    src={image.primaryImageSmall}
                                    alt={image.objectTitle || `Image ${index}`}
                                    width={100}
                                    height={100}
                                    className="w-full h-auto transition-all duration-200 ease-in-out border-4 md:border-8 hover:scale-105 cursor-pointer"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}