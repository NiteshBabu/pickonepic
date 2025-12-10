import { NextRequest, NextResponse } from 'next/server'

const baseURL = 'https://api.pexels.com/v1/search?'

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url)

	const query = searchParams.get('query') || 'moon'
	const page = searchParams.get('page') || '1'

	const url = `${baseURL}${new URLSearchParams({
		query,
		page,
		per_page: '20',
	})}`

	// console.log(url)
	try {
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				Authorization:
					'jo5tuaI3uzfNZR1HWm2OOgPcQSIuZtOdRinkr6O3fYiFIVUEczJng3ip',
			},
		})
		if (!response.ok)
			return NextResponse.json(
				{
					error: 'Failed to fetch from Pexels!',
				},
				{
					status: response.status,
				}
			)
		const data = await response.json()
		return NextResponse.json(data, { status: 200 })
	} catch (err: any) {
		console.log(err)
		return NextResponse.json(
			{
				error: err.message,
			},
			{
				status: 500,
			}
		)
	}
}

export const runtime = 'edge'
