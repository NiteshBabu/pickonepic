import InfiniteGallery from '@/components/InfiniteGallery'

// export const dynamic = 'force-dynamic'

type Props = {
	params: {
		query: string
	}
	searchParams: { q: string }
}

const generateMetadata = ({ params: { query } }: Props) => {
	return {
		title: query,
	}
}

function Page() {
	return (
		<>
			<InfiniteGallery />
		</>
	)
}

// if using paginated gallery
// function Page({ params: { query }, searchParams: { page } }: Props) {
//   return (
//     <>
//       <Gallery topic={q} page={page} />
//     </>
//   )
// }

export default Page
