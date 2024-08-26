import { Photo } from '@/models/Image.models'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  photo: Photo
}

function Photo({ photo }: Props) {
  const aspectRatio = photo.height / photo.width
  const photoHeight = Math.ceil(250 * aspectRatio)
  const rowSpan = Math.ceil(photoHeight / 10) + 1

  return (
    <div
      className="img-card p-3 mx-auto sm:mx-0"
      style={{ gridRow: `span ${rowSpan}` }}
    >
      <Link href={photo.src.large2x} target="_blank">
        <Image
          src={photo.src.large2x}
          alt={photo.alt}
          height={photoHeight}
          width={250}
          sizes="250px"
          placeholder="blur"
          blurDataURL={photo.blurredDataUrl}
          className='rounded-xl w-full'
        />
      </Link>
    </div>
  )
}

export default Photo
