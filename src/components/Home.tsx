import { Link } from "react-router-dom"
import Loading from "./Loading"

export default function Home() {
    
    return (
        <section className="flex flex-col justify-center items-center content-center gap-10 h-96">
            <div>
                <h1 className="uppercase text-8xl font-bold mt-72 text-neutral-900 text-center">Pub Crawl</h1>
            </div>
            <div className="flex flex-col items-center mt-20">
                <Link to={'/pubs'} className="text-4xl">Find a Brewery</Link>
                <div className="text-4xl">•</div>
                <Link to={'/drinks'} className="text-4xl">Look up Drinks</Link>
            </div>
            <Loading />
        </section>
    )
}