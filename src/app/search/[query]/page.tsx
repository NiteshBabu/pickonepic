import Gallery from '@/components/Gallery'

type Props = {
    params : {
        query : string
    }
}

const generateMetadata = ({params : {query}} : Props) =>{
    return ({
        title : query
    })
}

function Page({params : {query}} : Props) {
    return (
        <Gallery topic={query} />
    )
}

export default Page