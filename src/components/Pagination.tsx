'use client'
import Link from 'next/link'

type Props = {
  pagination: { page: number; per_page: number; total_pages: number }
}

export default function Pagination({
  pagination: { page, per_page, total_pages },
}: Props) {
  const isFirstPage = page === 1
  const isLastPage = page === total_pages
  return (
    <div className="pagination mx-auto flex gap-5 font-bold text-lg">
      {!(page - 10 < 1) && (
        <Link href={`?page=${page - 10}`} className="mr-5">
          {page - 10} ...
        </Link>
      )}
      {page > 1 && <Link href={`?page=${page - 1}`}>&lt;</Link>}
      {page - 2 > 1 && (
        <>
          <Link href={`?page=${page - 1}`}>{page - 1}</Link>
        </>
      )}
      <p className="text-xl scale-110 text-cyan-300">{page}</p>
      {page + 2 < total_pages && (
        <>
          <Link href={`?page=${page + 1}`}>{page + 1}</Link>
        </>
      )}
      {page < total_pages && <Link href={`?page=${page + 1}`}>&gt;</Link>}
      {!(page + 10 > total_pages) && (
        <Link href={`?page=${page + 10}`} className="ml-5">
          {' '}
          ...{page + 10}
        </Link>
      )}
    </div>
  )
}
