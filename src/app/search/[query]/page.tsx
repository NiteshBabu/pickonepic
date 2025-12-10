import Gallery from '@/components/Gallery'

type Props = {
	params: {
		query: string
	}
	searchParams: { page: string }
}

const generateMetadata = ({ params: { query } }: Props) => {
	return {
		title: query,
	}
}

function Page({ params: { query }, searchParams: { page } }: Props) {
	return (
		<>
			<Gallery topic={query} page={page} />
		</>
	)
}

export default Page

export const runtime = 'edge'
