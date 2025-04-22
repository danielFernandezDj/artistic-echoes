"use client"

/**
 * Image.tsx
 *
 * A wrapper component around Next.js <Image /> that includes
 * a skeleton loader until the image has fully loaded.
 *
 * Props:
 * - src, alt, className: passed directly to Next.js Image
 *
 * State:
 * - Tracks loading state and toggles opacity after image load
 */

import React, { useState } from "react";

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
}

const Image: React.FC<ImageProps> = ({ src, alt, className }) => {
  const [imageSize, setImageSize] = useState<{ width: number; height: number } | null>(null);

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const { naturalWidth: width, naturalHeight: height } = event.currentTarget;
    setImageSize({ width, height });
  };

  return (
    <div className={`relative ${className}`}>
      {/* Skeleton Loader */}
      {!imageSize && <div className="skeleton-loader w-full h-full absolute top-0 left-0 bg-gray-300 animate-pulse"></div>}

      {/* Actual Image */}
      <img
        src={src}
        alt={alt}
        onLoad={handleImageLoad}
        className={`transition-opacity duration-300 ${!imageSize ? "opacity-0" : "opacity-100"} border-4`}
        style={!imageSize ? { visibility: "hidden" } : {}}
      />

      {/* Display Image Dimensions */}
      {imageSize && (
        <p className="mt-2 text-sm text-gray-500">
          Dimensions: {imageSize.width} x {imageSize.height}px
        </p>
      )}
    </div>
  );
};

export default Image;