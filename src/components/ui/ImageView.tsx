"use client";

import React from "react";
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
    if (!imageView || !selectedImage) return null;

    const handleClose = () => {
        setImageView(false);
        setSelectedImage(null)
    }

    return (
        <Container
            size="full"
            className="flex justify-center items-center  top-0 left-0 bg-gray-900/30 p-4 z-10 w-full h-full | border-2 border-red-500"
            position="absolute"
        >
            <button
                className="absolute top-4 left-4 text-red-500"
                onClick={handleClose}
            >
                <X size={24} />
            </button>
            <div>
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