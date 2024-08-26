import { getBlurredUrl, getImages } from '@/lib/fetchImages'
import Photo from './Photo'
import { Photo as TypePhoto, ImageResponse } from '@/models/Image.models'

type Props = {
  topic?: string
}

export default async function Gallery({ topic }: Props) {
  let images: ImageResponse | undefined = await getImages(topic || 'corgis')

  if (!images?.photos.length) {
    return <h1 className='text-3xl font-bold text-red-500 text-center my-auto'>Nothing To Show Here, Try Something Else..? 😶</h1>
  }

  let photos: TypePhoto[] = await getBlurredUrl(images)

  return (
    <div className="grid grid-cols-gallery grid-rows-[10px] content-start">
      {photos ? (
        photos.map((photo) => <Photo photo={photo} />)
      ) : (
        <p className="text-5xl text-red-500 mx-auto ">No Pics Found</p>
      )}
    </div>
  )
}
