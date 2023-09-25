import { Photo } from '@/models/Image.models'
import Image from 'next/image'
import React, { useState } from 'react'

type Props = {
    photo: Photo
}

function Photo({ photo }: Props) {
    return (
        <div className="img-card">
            <Image
                src={photo.src.large2x}
                alt={photo.alt}
                fill
                className="object-cover"
                placeholder="blur"
                blurDataURL={photo.blurredDataUrl}
            />
        </div>
    )
}

export default Photo