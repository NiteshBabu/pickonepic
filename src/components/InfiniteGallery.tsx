'use client'
import {
	type ImageResponse,
	type Photo as TypePhoto,
} from '@/models/Image.models'
import { useSearchParams } from 'next/navigation'
import {
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react'
import Photo from './Photo'

type Props = {
	topic?: string
	page?: string
}

const baseURL = '/api/pexels'

export const getImages = async (
	query: string = 'corgis',
	page: string = '1'
): Promise<ImageResponse | undefined> => {
	const url = `${baseURL}?${new URLSearchParams({
		query,
		page,
		per_page: '20',
	})}`

	try {
		const response = await fetch(url)
		if (!response.ok) {
			throw response
		}
		const data: ImageResponse = await response.json()
		return data
	} catch (e: any) {
		console.error(`${e.status}: ${e.statusText}`)
	}
}

export default function InfiniteGallery() {
	const [page, setPage] = useState(1)
	const pageRef = useRef(page)
	const [element, setElement] = useState<HTMLElement | null>(null)
	const [fetching, setFetching] = useState(true)
	const [photos, setPhotos] = useState<TypePhoto[] | []>([])
	
	const searchParams = useSearchParams()
	const topic = searchParams.get('q')?.toLowerCase() || 'Beach'


	useEffect(() => {
		setPhotos([])
		setPage(1)
		setFetching(true)
		getImages(topic, page.toString()).then((resp) => {
			if (resp) {
				setPhotos(resp.photos)
			}
			setFetching(false)
		})
	}, [topic])

	useEffect(() => {
		if (photos && photos.length > 0) {
			getImages(topic, page.toString()).then((resp) => {
				if (resp && resp.photos.length > 0) {
					setPhotos([...photos, ...resp.photos])
				} else {
					if (element) {
						element.style.display = 'none'
					}
				}
			})
		}
	}, [page])

	useEffect(() => {
		if (!element) return

		const fetchMore = new IntersectionObserver(
			(entries, observer) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && pageRef.current) {
						console.log('YY', pageRef.current)
						pageRef.current++
						setPage(pageRef.current)
					}
				})
			},
			{
				rootMargin: '300px',
			}
		)
		fetchMore.observe(element)

		return () => fetchMore.unobserve(element)
	}, [element])
	const callbackRef = useCallback((element: HTMLElement | null) => {
		if (!element) return

		const fetchMore = new IntersectionObserver(
			(entries, observer) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && pageRef.current) {
						console.log('YY', pageRef.current)
						pageRef.current++
						setPage(pageRef.current)
					}
				})
			},
			{
				rootMargin: '300px',
			}
		)
		fetchMore.observe(element)

		return () => fetchMore.unobserve(element)
	}, [])

	if (fetching) {
		return (
			<div className='grid place-content-center h-full'>
				<div className=' animate-spin h-[40px] w-[40px] border-4 border-t-teal-800 rounded-full border-gray-900 my-5'></div>
			</div>
		)
	}
	if (!photos || photos.length <= 0) {
		return (
			<h1 className='text-3xl font-bold text-red-500 text-center my-auto'>
				Nothing To Show Here, Try Something Else..? 😶
			</h1>
		)
	}
	return (
		<>
			<div className='grid grid-cols-gallery grid-rows-[10px] content-start group'>
				{photos.map((photo) => (
					<Photo  photo={photo} isClient key={photo.id} />
				))}
			</div>
			<div className='grid place-content-center'>
				<div
					id='fetchMore'
					ref={callbackRef}
					className='animate-spin h-[40px] w-[40px] border-4 border-t-teal-800 rounded-full border-gray-900 my-5'></div>
			</div>
		</>
	)
}
