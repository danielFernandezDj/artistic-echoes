"use client"

import React, { useState } from 'react';
import NextImage from 'next/image';

interface ImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  quality?: number;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
  sizes?: string;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  skeletonClassName?: string;
}

const Image: React.FC<ImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  quality = 75,
  priority = false,
  loading = 'lazy',
  sizes,
  objectFit = 'cover',
  skeletonClassName = '',
}) => {
  const [isLoading, setIsLoading] = useState(!priority);

  const imageClasses = `
    transition-opacity duration-300
    ${isLoading ? 'opacity-0' : 'opacity-100'}
    ${className}
  `.trim();

  const skeletonClasses = `
    absolute 
    top-0 
    left-0 
    w-full 
    h-full 
    bg-gray-200 
    animate-pulse 
    rounded-md
    ${skeletonClassName}
  `.trim();

  return (
    <div className="relative" style={{ width, height }}>
      {isLoading && (
        <div className={skeletonClasses} />
      )}
      <NextImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={imageClasses}
        quality={quality}
        priority={priority}
        loading={loading}
        sizes={sizes}
        style={{ objectFit }}
        onLoadingComplete={() => setIsLoading(false)}
      />
    </div>
  );
};

export default Image;