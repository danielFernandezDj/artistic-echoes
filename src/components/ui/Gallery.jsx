'user client'

import { GetAllImages } from '../../app/api/images/GetAllImages'

export default async function GalleryPage() {
    const images = await GetAllImages()

    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {images.map((image, index) => (
                    <div key={index} className="border p-4 rounded">
                        {image.primaryImageSmall && (
                            <img
                                src={image.primaryImageSmall}
                                className="w-full h-48 object-cover"
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}