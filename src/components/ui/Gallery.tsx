"use client";

/**
 * Gallery.tsx
 *
 * This component fetches image data from the `/api/images` endpoint and displays them
 * in a responsive, scrollable gallery layout. Each image is clickable and opens a detailed view.
 *
 * Features:
 * - Fetching and displaying images from the backend
 * - Loading state UI
 * - Triggers `ImageView` when an image is clicked
 * - Includes download links for each image
 */

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ImageDown } from "lucide-react";
import ImageView from "./ImageView"
import { ImageStock } from "@/lib/ImageStockType";

const Gallery: React.FC = () => {
  const [images, setImages] = useState<ImageStock[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [imageView, setImageView] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<ImageStock | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/images');
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
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="grid place-items-center h-screen">
          <p className="animate-pulse text-2xl p-2 bg-black rounded-md">Loading gallery...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {imageView && selectedImage && (
        <ImageView
          imageView={imageView}
          setImageView={setImageView}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
      )}
      <div className="w-full h-auto m-auto px-4 md:px-16">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-16 ">
          {images.map((image, index) => (
            <div
              key={index}
              onClick={() => {
                setSelectedImage(image);
                setImageView(true)
              }}
              className="relative mb-8 md:mb-16 group"
            >
              <span className="cursor-zoom-in absolute w-full h-full bg-slate-900/30 opacity-0 group-hover:opacity-100" />
              <div className="z-10 absolute top-2  p-2 left-2 opacity-0 group-hover:opacity-100 pointer-events-none select-none">
                <h2 className="text-xl text-center font-bold text-slate-50 rounded-md">
                  {image.objectTitle.length > 25
                    ? `${image.objectTitle.substring(0, 20)}...`
                    : image.objectTitle}
                </h2>
              </div>
              <div className="z-10 absolute top-2 p-2 right-2 opacity-0 group-hover:opacity-100">
                <a href={`/api/download/${image.id}`} download>
                  <ImageDown className="w-8 h-auto cursor-pointer text-slate-50" />
                </a>
              </div>
              {image.primaryImageSmall && (
                <div>
                  <Image
                    src={image.primaryImageSmall}
                    alt={image.objectTitle}
                    width={100}
                    height={100}
                    className="w-full h-auto transition-all duration-200 ease-in-out border-4 md:border-8"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Gallery;