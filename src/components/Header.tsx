import React from 'react'
import Search from './Search'
import Link from 'next/link'

function Header() {
    return (
        <div className=''>
            <nav className='flex flex-col items-center sm:flex-row sm:justify-between  py-5 gap-4'>
                <Link href="/">
                    <h1 className='text-4xl font-bold'>Pick-One-Pic</h1>
                </Link>
                <Search />
            </nav>
        </div>
    )
}

export default Header