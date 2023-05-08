import { Link } from "react-router-dom"

export default function Home() {
    
    return (
        <section className="flex justify-center content-center gap-10 h-96">
            <div className="flex flex-col">
                <Link to={'/pubs'}>Find a Brewery</Link>
                <Link to={'/drinks'}>Look up Drinks</Link>
            </div>
            <div>
                hello, this is where the logo will be
            </div>
        </section>
    )
}