import { getBlurredUrl, getImages } from '@/lib/fetchImages';
import React from 'react'
import Photo from './Photo';
import { Photo as TypePhoto, ImageResponse } from '@/models/Image.models';

type Props = {
    topic?: string
}

export default async function Gallery({ topic }: Props) {

    let images: ImageResponse | undefined = await getImages(topic || "beaches");
    let photos: TypePhoto[] | null = null

    if (images) {
        photos = await getBlurredUrl(images)
    }

    return (
        // <div className="flex flex-wrap gap-4 mt-10 justify-start items-start">
        <div className="grid grid-cols-gallery  grid-rows-[10px] ">
            {photos ? (
                photos.map((photo) => <Photo photo={photo} />)
            ) : (
                <p className="text-5xl text-red-500 mx-auto ">No Pics Found</p>
            )}
        </div>
    )
}
