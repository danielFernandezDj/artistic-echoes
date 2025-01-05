"use client"
import { ImageDown } from 'lucide-react';
import { useState } from 'react';

interface ImageDownloadButtonProps {
    imageUrl: string;
    title: string;
}

// Create a new component for the download button
const ImageDownloadButton = ({ imageUrl, title }: ImageDownloadButtonProps) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      
      // Fetch the image
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      
      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      // Create a clean filename from the title
      link.download = `${title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.jpg`;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <button 
      onClick={handleDownload}
      disabled={isDownloading}
      className="focus:outline-none"
    >
      <ImageDown className={`w-8 h-auto cursor-pointer text-slate-50 ${
        isDownloading ? 'opacity-50' : ''
      }`} />
    </button>
  );
};

export default ImageDownloadButton;