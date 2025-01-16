"use client";

import React, { useEffect } from "react";
import Container from "../layout/Container";
import Image from "next/image";
import { ImageDown, X } from "lucide-react";
import { ImageStock } from "@/lib/types";

interface ImageViewProps {
    imageView: boolean;
    setImageView: React.Dispatch<React.SetStateAction<boolean>>;
    selectedImage: ImageStock | null;
    setSelectedImage: React.Dispatch<React.SetStateAction<ImageStock | null>>;
    image: ImageStock;
}

const ImageView: React.FC<ImageViewProps> = ({ imageView, setImageView, selectedImage, setSelectedImage }) => {
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
                className="flex flex-col items-center gap-4 pt-8 mt-2 rounded-xl  bg-white"
            >
                <div className="static flex justify-between w-full h-auto m-auto">
                    <button
                        className="text-red-500 hover:rotate-90 transition ease-in-out duration-300"
                        onClick={handleClose}
                    >
                        <X size={32} />
                    </button>
                    <button
                        className="flex gap-2 items-center p-2 font-bold rounded-md text-slate-950 border-2 border-slate-950"
                    >
                        Download
                        <ImageDown size={28} />
                    </button>
                </div>
                <Container
                    size="full"
                    position="relative"
                    className="flex flex-wrap justify-center gap-4 w-full p-4 overflow-scroll"
                >
                    <Image
                        src={selectedImage.primaryImageSmall}
                        alt={selectedImage.objectTitle}
                        width={700}
                        height={100}
                        className="border-2 p-2 bg-black/10 border-black"
                    />

                    <p className="w-full text-center text-xl text-slate-950/50">Dimension: {selectedImage.dimensions}</p>

                    <div className="flex flex-col justify-start text-slate-950 w-full h-full mb-20 p-4 bg-black/5 rounded-xl">
                        <h2 className="mt-4 text-xl font-bold">{selectedImage.objectTitle}</h2>
                        <p className="mt-4 text-xl font-bold">ArtistName: {selectedImage.artistName}</p>
                        <p className="mt-4 text-xl font-bold">Title: {selectedImage.objectDate}</p>
                        <p className="mt-4 text-xl font-bold">Repo: {selectedImage.repository}</p>
                    </div>
                </Container>
            </Container>
        </Container>
    )
}

export default ImageView;