import React from 'react'

function Footer() {
	return (
		<footer className='sticky  bottom-0 w-full z-10 py-3 font-mono'>
			<div className='text-center font-bold text-sm sm:text-right'>
				&copy;{new Date().getFullYear()} Made With
				<span className='animate-pulse scale-150 text-4xl font-extrabold mx-3 text-red-600'>
					&hearts;
				</span>
				By
				<span className='font-bold text-4xl mx-2'>Nitesh</span>
			</div>
		</footer>
	)
}

export default Footer
