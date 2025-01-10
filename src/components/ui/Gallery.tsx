"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ImageDown } from "lucide-react";

interface ImageStock {
  id: string;
  objectTitle: string;
  primaryImage: string;
  primaryImageSmall: string;
}

export default function GalleryPage() {
  const [images, setImages] = useState<ImageStock[]>([]);
  const [loading, setLoading] = useState<boolean>(true);


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
  
  useEffect(() => {
    fetchImages();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="grid place-items-center h-screen">
          <div className="animate-pulse">Loading gallery...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="columns-1 md:columns-2 lg:columns-3 gap-8 ">
        {images.map((image, index) => (
          <div key={index} className="relative my-8 group">
            <span className="cursor-zoom-in absolute top-0 left-0 w-full h-full image-gradient opacity-0 group-hover:opacity-100" />
            <div className="z-10 absolute top-2  p-2 left-2 opacity-0 group-hover:opacity-100 pointer-events-none select-none">
              <h2 className="text-xl text-center font-bold text-slate-50 rounded-md">
                {image.objectTitle.length > 25
                  ? `${image.objectTitle.substring(0, 20)}...`
                  : image.objectTitle}
              </h2>
            </div>
            <div className="z-10 absolute top-2  p-2  right-2 opacity-0 group-hover:opacity-100">
              <a href={`/api/download/${image.id}`} download>
                <ImageDown className="w-8 h-auto cursor-pointer text-slate-50" />
              </a>
            </div>

            {image.primaryImageSmall && (
              <Image
                src={image.primaryImageSmall}
                alt={image.objectTitle}
                width={500}
                height={300}
                className="w-full transition-all duration-200 ease-in-out"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
