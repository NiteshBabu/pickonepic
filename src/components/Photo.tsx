'use client'
import { type Photo } from '@/models/Image.models'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

type Props = {
	photo: Photo
} & {
	isClient: boolean
}

function Photo({ photo, isClient }: Props) {
	const aspectRatio = photo.height / photo.width
	const photoHeight = Math.ceil(250 * aspectRatio)
	const rowSpan = Math.ceil(photoHeight / 10) + 1

	const [fetchingImage, setFetchingImage] = useState(true)
	return (
		<div
			className='img-card p-2 mx-auto sm:mx-0 group-hover:opacity-70 group-hover:[&:has(:hover)]:opacity-100 hover:scale-105 transition-all duration-500 ease-in-out'
			style={{ gridRow: `span ${rowSpan}` }}>
			<Link href={photo.src.large2x} target='_blank'>
				{isClient ? (
					<>
						{fetchingImage && <Skeleton photoHeight={photoHeight} />}
						<img
							src={photo.src.large2x}
							alt={photo.alt}
							className={`${
								fetchingImage ? 'hidden' : 'block'
							} rounded-xl w-full`}
							style={{
								height: photoHeight,
							}}
							onLoad={() => setFetchingImage(false)}
						/>
					</>
				) : (
					<Image
						src={photo.src.large2x}
						alt={photo.alt}
						height={photoHeight}
						width={250}
						sizes='250px'
						placeholder='blur'
						blurDataURL={photo.blurredDataUrl}
						className='rounded-xl w-full'
					/>
				)}
			</Link>
		</div>
	)
}

const Skeleton = ({ photoHeight }: { photoHeight: number }) => (
	<div
		className={`w-[250px] bg-gray-800 animate-pulse rounded-xl h-full `}
		style={{
			height: photoHeight,
		}}></div>
)

export default Photo
