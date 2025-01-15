"use client";

import React, { useEffect } from "react";
import Container from "../layout/Container";
import Image from "next/image";
import { X } from "lucide-react";
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
            className="insert-10 flex justify-center items-center h-screen z-50 bg-gray-900/30 p-4"
            position="fixed"
        >
            <button
                className="absolute top-4 left-4 text-red-500"
                onClick={handleClose}
            >
                <X size={24} />
            </button>
            <div className="">
                <Image
                    src={selectedImage.primaryImage}
                    alt={selectedImage.objectTitle}
                    width={300}
                    height={300}
                    className=""
                />
                <h2 className="mt-4 text-xl font-bold">{selectedImage.objectTitle}</h2>
                <p className="mt-2 text-sm text-gray-500">{selectedImage.artistName}</p>
                <p className="text-sm text-gray-500">{selectedImage.objectDate}</p>
                <p className="text-sm text-gray-500">{selectedImage.dimensions}</p>
                <p className="text-sm text-gray-500">{selectedImage.repository}</p>
            </div>
        </Container>
    )
}

export default ImageView;