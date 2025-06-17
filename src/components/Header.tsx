import React from 'react'
import Search from './Search'
import Link from 'next/link'

function Header() {
	return (
		<div className='sticky backdrop-blur-sm shadow-2xl top-0 w-full z-10  flex flex-col items-center lg:flex-row sm:justify-between  my-5 py-4  gap-8'>
			<nav className='max-w-7xl px-2 mx-auto w-full flex justify-between'>
				<Link href='/'>
					<h1 className='text-4xl font-bold'>Pick-One-Pic</h1>
				</Link>
				<Search />
			</nav>
		</div>
	)
}

export default Header
