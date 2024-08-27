import React from 'react'
import Search from './Search'
import Link from 'next/link'

function Header() {
  return (
    <div className="flex flex-col items-center lg:flex-row sm:justify-between  my-10 mx-8 md:mx-3 gap-8">
      <nav className="">
        <Link href="/">
          <h1 className="text-4xl font-bold">Pick-One-Pic</h1>
        </Link>
      </nav>
      <Search />
    </div>
  )
}

export default Header
