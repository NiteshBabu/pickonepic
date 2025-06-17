import InfiniteGallery from '@/components/InfiniteGallery'

type Props = {
  searchParams: {
    q: string
  }
}


export default async function Home() {

  return (
      <InfiniteGallery  />
  )
}
