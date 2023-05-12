import { Link } from "react-router-dom"

export default function Home() {
    
    return (
        <section className="homepage flex flex-col justify-center items-center content-center gap-10 h-96 mt-80">
            <div>
                <h1 className="uppercase text-8xl font-extrabold text-neutral-300 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-center">Pub Crawl</h1>
            </div>
            <div className="flex flex-col items-center mt-20 rounded-lg">
                <Link to={'/pubs'} className="text-4xl md:text-7xl text-neutral-300 hover:text-neutral-400 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] font-bold active:scale-95">Find a Brewery</Link>
                <div className="text-6xl text-neutral-300">-</div>
                <Link to={'/drinks'} className="text-4xl md:text-7xl text-neutral-300 hover:text-neutral-400 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] font-bold active:scale-95">Look up Drinks</Link>
            </div>
            <img src="/beer-cheers-gif.webp" className="max-w-sm"/>
        </section>
    )
}