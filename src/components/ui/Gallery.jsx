'user client'

import { GetAllImages } from '../../app/api/images/GetAllImages'
import ImageDownloadButton from './ImageDownloadBtn';
import { ImageDown } from 'lucide-react';

export default async function GalleryPage() {
    const images = await GetAllImages()

    return (
        <div className="container mx-auto p-4">
            <div className="columns-1 md:columns-2 lg:columns-3 gap-8 ">
                {images.map((image, index) => (
                    <div key={index} className="relative my-8 group">
                        <span
                            className='cursor-zoom-in absolute top-0 left-0 w-full h-full image-gradient opacity-0 group-hover:opacity-100'
                        />
                        <div className="z-10 absolute top-2  p-2 left-2 opacity-0 group-hover:opacity-100 pointer-events-none select-none">
                            <h2 className="text-xl text-center font-bold text-slate-50 rounded-md"
                            >
                                {image.objectTitle.length > 25
                                    ? `${image.objectTitle.substring(0, 20)}...`
                                    : image.objectTitle
                                }
                            </h2>
                        </div>
                        <div className="z-10 absolute top-2  p-2  right-2 opacity-0 group-hover:opacity-100">
                            <ImageDownloadButton
                                imageURL={image.primaryImage}
                                title={image.objectTitle}
                                className='w-8 h-auto cursor-pointer text-slate-50'
                            />
                        </div>

                        {image.primaryImageSmall && (
                            <img
                                src={image.primaryImageSmall}
                                className="w-full transition-all duration-200 ease-in-out"
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}