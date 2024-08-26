import Gallery from '@/components/Gallery'

type Props = {
  searchParams: {
    q: string
  }
}


export default async function Home({ searchParams: { q } }: Props) {

  return (
      <Gallery topic={q} />
  )
}
