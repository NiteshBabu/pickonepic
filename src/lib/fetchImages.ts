import { ImageResponse, Photo } from '@/models/Image.models'
import sharp from 'sharp'
import https from 'https'
import { getPlaiceholder } from 'plaiceholder'
const baseURL = 'https://api.pexels.com/v1/search?'

export const getImages = async (
  query: string = 'corgis',
  page: string = '1'
): Promise<ImageResponse | undefined> => {
  const url = `${baseURL}${new URLSearchParams({ query, page, per_page : "5" })}`
    
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: process.env.TOKEN!,
      },
    })
    if (!response.ok) {
      throw response
    }

    const data: ImageResponse = await response.json()
    return data
  } catch (e: any) {
    console.error(`${e.status}: ${e.statusText}`)
  }
}
// function fetchImage(url) {
//     return new Promise((resolve, reject) => {
//         https.get(url, (response) => {
//             if (response.statusCode === 200) {
//                 let data = [];
//                 response.on('data', (chunk) => {
//                     data.push(chunk);
//                 });

//                 response.on('end', () => {
//                     const buffer = Buffer.concat(data);
//                     resolve(buffer);
//                 });
//             } else {
//                 console.log(response.statusMessage)
//                 reject(new Error(`Failed to fetch image. Status code: ${response.statusCode}`));
//             }
//         });
//     });
// }

const getBase64 = async (url: string) => {
  try {
    const resp = await fetch(url)
    // if (!resp.ok) throw new Error(`Something went wrong while fetching image, ${resp.status} : ${resp.statusText}`)
    const respBuffer = await resp.arrayBuffer()
    const imgBuffer = Buffer.from(respBuffer)
    // return `data:image/png;base64,${imgBuffer.toString("base64")}`
    const resizedImageBuffer = await sharp(imgBuffer)
      .resize(10, 10, { fit: 'inside' })
      .webp({ quality: 100 })
      .toBuffer()
    return `data:image/png;base64,${resizedImageBuffer.toString('base64')}`
    // return resizedImageBuffer.toString("base64")
    // const { base64 } = await getPlaiceholder(imgBuffer)
    // console.log(base64)
    // return base64
  } catch (e) {
    return new Promise((resolve) => resolve(e))
  }
}

export const getBlurredUrl = async (
  images: ImageResponse
): Promise<Photo[]> => {
  const base64Promises = images.photos.map((photo: Photo) =>
    getBase64(photo.src.large2x)
  )
  const base64Urls = await Promise.all(base64Promises)

  return images.photos.map((photo, indx) => ({
    ...photo,
    blurredDataUrl: base64Urls[indx] as string,
  }))
}
