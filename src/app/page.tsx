import Link from "next/link";
import Gallery from "@/components/Gallery";
import Search from "@/components/Search";

type Props = {
  searchParams: {
    q: string
  }
}

export default async function Home({searchParams : {q}}: Props) {
  // const fetchNextPage = () => {
  //   fetch(images?.next_page!)
  //     .then((resp) => resp.json())
  //     .then((d) => setImages(d));
  // };
  return (
    <>
      <Gallery topic={q} />
    </>
  );
}
