// import withPlaiceholder from "@plaiceholder/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				hostname: 'images.pexels.com',
			},
			{
				hostname: 'ik.imagekit.io',
			},
		],
	},
}

export default nextConfig
