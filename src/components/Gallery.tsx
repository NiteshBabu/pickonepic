import { getBlurredUrl, getImages } from '@/lib/fetchImages';
import React from 'react'
import Photo from './Photo';
import { Photo as TypePhoto } from '@/models/Image.models';
import { ImageResponse } from 'next/server';

type Props = {
    topic?: string
}

export default async function Gallery({ topic }: Props) {

    let images: ImageResponse | undefined = await getImages(topic || "beaches");
    let photos: TypePhoto[]

    if (images) {
        photos = await getBlurredUrl(images)
    }

    return (
        <div className="flex flex-wrap gap-4 mt-10 justify-start items-start">
            {photos ? (
                photos.map((photo) => <Photo photo={photo} />)
            ) : (
                <p className="text-5xl text-red-500 mx-auto ">No Pics Found</p>
            )}
        </div>
    )
}
