"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Container from "../layout/Container";
import Image from "../layout/Image";
import { Link } from "@radix-ui/themes";
import { ImageDown, X, Heart } from "lucide-react";
import { ImageStock } from "@/lib/ImageStockType";
import { useAuthModal } from "@/context/AuthModalContext";

interface ImageViewProps {
    imageView: boolean;
    setImageView: React.Dispatch<React.SetStateAction<boolean>>;
    selectedImage: ImageStock | null;
    setSelectedImage: React.Dispatch<React.SetStateAction<ImageStock | null>>;
}

const ImageView: React.FC<ImageViewProps> = ({ imageView, setImageView, selectedImage, setSelectedImage }) => {
    const { data: session } = useSession();
    const { openModal } = useAuthModal();
    const [toggleLike, setToggleLike] = useState(false)
    const [imageIDs, setImageIds] = useState<string[]>([])

    const isLiked = Array.isArray(imageIDs) && selectedImage?.museumID
        ? imageIDs.includes(String(selectedImage.museumID))
        : false;

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch('/api/get-user-liked-img')
                const data = await response.json()

                setImageIds(Array.isArray(data.imageID) ? data.imageID : [])
            } catch (error) {
                console.error('Error fetching image Ids', error)
            }
        }
        fetchImages();
    }, [])

    const handleRemoveFavorite = async () => {
        if (!isLiked || !selectedImage || !session?.user) return;

        try {
            const res = await fetch('/api/remove-user-image', {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userEmail: session?.user?.email,
                    museumID: selectedImage?.museumID,
                })
            })

            if (res.ok) {
                setToggleLike(false)
                setImageIds((prev) => prev.filter((id) => id !== String(selectedImage.museumID)))
            } else {
                console.error("Files to remove favorite image")
            }
        } catch (error) {
            console.error("Error removing favorite image", error)
        }
    }

    const handleUpdateFavorite = async () => {
        if (isLiked || !selectedImage || !session?.user) {
            console.error(`❌ Error: handleUpdateFavorite > Reason ${isLiked ? "Already liked" : "Invalid session or image"}`);
            return;
        }

        try {
            const res = await fetch('/api/update-user-favorite', {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userEmail: session?.user?.email,
                    museumID: selectedImage.museumID,
                })
            });

            if (!res.ok) {
                const errorData = await (async () => {
                    try {
                        return await res.json();
                    } catch {
                        return { message: "Failed to parse error response" };
                    }
                })();

                console.error("❌ Failed to update favorite image:", errorData);
                return;
            }

            setToggleLike((prev) => !prev);
            setImageIds((prev) => [...new Set([...prev, String(selectedImage.museumID)])]);

        } catch (error) {
            console.error("Error updating favorite image", error);
        }
    };

    useEffect(() => {
        if (imageView) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto'
        }

        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [imageView])

    if (!imageView || !selectedImage) return null;

    const handleClose = () => {
        setImageView(false);
        setSelectedImage(null)
    }

    return (
        <Container
            size="full"
            className="insert-0 flex justify-center h-screen z-50 bg-black/80 p-4"
            position="fixed"
        >
            <Container
                size="lg"
                position="relative"
                className="pt-8 mt-2 rounded-xl bg-white"
            >
                <div className="flex justify-between w-full h-auto m-auto mb-4">
                    <button
                        className="text-red-500 hover:rotate-90 transition ease-in-out duration-300"
                        onClick={handleClose}
                    >
                        <X size={32} />
                    </button>

                    <div className="flex items-center gap-4">
                        <Link
                            onClick={() => {
                                if (!session) {
                                    openModal();
                                    return;
                                }

                                if (isLiked || toggleLike) {
                                    handleRemoveFavorite();
                                } else {
                                    handleUpdateFavorite();
                                }
                            }}
                            className="p-2 rounded-md border text-gray-800 hover:border-gray-700 hover:bg-gray-100"
                        >
                            <Heart
                                size={26}
                                className={isLiked || toggleLike ? 'fill-red-500' : 'fill-none'}
                            />
                        </Link>
                        <a
                            href={`/api/download/${selectedImage.id}`} download
                            className="flex gap-2 items-center p-2 font-bold rounded-md border text-gray-800 hover:border-gray-700 hover:bg-gray-100"
                        >
                            Download
                            <ImageDown size={26} />
                        </a>
                    </div>
                </div>
                <Container
                    size="full"
                    position="relative"
                    className="flex flex-wrap justify-center gap-4 w-full h-full  mb-4 p-4 overflow-auto"
                >
                    <Image
                        src={selectedImage.primaryImage}
                        alt={selectedImage.objectTitle}
                        className="max-w-3xl mb-4"
                    />
                    <div className="flex flex-col justify-start w-full h-auto mb-28 p-4 bg-gray-800/5 font-serif rounded-xl">
                        <h2 className="text-2xl font-bold text-gray-800 underline decoration-1">
                            {selectedImage.objectTitle}
                        </h2>
                        <div className="flex flex-col gap-2 mt-2  text-gray-700">
                            <p> <span className="font-semibold">Artist Name:</span> {selectedImage.artistName}. </p>
                            <p>
                                <span className="font-semibold">
                                    Artist Wiki:
                                </span>
                                <a
                                    href={selectedImage.artistWikidata_URL}
                                    target="_blank"
                                    className="px-2 hover:text-magenta-color hover:underline decoration-1 cursor-alias"
                                >
                                    Wikidata URL ⤴︎
                                </a>
                            </p>
                            <p> <span className="font-semibold">Medium: </span> {selectedImage.medium}.</p>
                            <p> <span className="font-semibold">Nationality: </span> {selectedImage.artistNationality}.</p>
                            <p> <span className="font-semibold">Culture: </span> {selectedImage.culture}.</p>
                            <p>
                                <span className="font-semibold">
                                    Artist Begin & End Date:
                                </span> {selectedImage.artistBeginDate} to {selectedImage.artistEndDate}.
                            </p>
                            <p> <span className="font-semibold">Credit Line: </span> {selectedImage.creditLine}.</p>
                            <p> <span className="font-semibold">Repo From: </span> {selectedImage.repository}.</p>
                            <p> <span className="font-semibold">Paint Dimensions: </span> {selectedImage.dimensions}.</p>
                            <p> <span className="font-semibold">Gallery Num: #</span> {selectedImage.GalleryNumber}.</p>
                        </div>
                    </div>
                </Container>
            </Container>
        </Container>
    )
}

export default ImageView;