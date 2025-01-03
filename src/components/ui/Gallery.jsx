'as user'

import { GetAllImages } from '../../app/api/images/GetAllImages'

export default async function GalleryPage() {
    const images = await GetAllImages()

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl mb-4">Gallery</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {images.map((image, index) => (
                    <div key={index} className="border p-4 rounded">
                        {image.primaryImage && (
                            <img
                                src={image.primaryImage}
                                className="w-full h-48 object-cover"
                            />
                        )}
                        <h2 className="mt-2">{image.objectTitle || 'Untitled'}</h2>
                        <p>{image.artistName || 'Unknown Artist'}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}