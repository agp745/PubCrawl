import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCoordinates } from "../app/location"
import type { LocationInfo } from "../app/location"
import type { RootState } from "../app/store/store"
import axios from "axios"
import Map from "./Map"


function SearchBar() {

    return (
        <>
            <input type="text" placeholder="city"/>
            <button>Search</button>
        </>
    )
}

export default function PubSearch() {

    const { currentCoords, isLoading } = useSelector((state: RootState) => state.location)
    const dispatch = useDispatch()

    const [breweries, setBreweries] = useState([])
    const [page, setPage] = useState(1)

    useEffect(() => {
        getCoordinates(dispatch)
        if(!isLoading) {
            fetchPubs(currentCoords.latitude, currentCoords.longitude, page)
        }
    }, [dispatch, currentCoords, page])

    const fetchPubs = async (latitude: number, longitude: number, page: number) => {
        const { data } = await axios.get(`https://api.openbrewerydb.org/v1/breweries/?by_dist=${latitude},${longitude}&page=${page}&per_page=6`)
        setBreweries(data)
    }

    const nearbyBreweries = breweries.map((pub: LocationInfo) => {
        return <div key={pub.id}>
            <h2 className="font-bold">{pub.name}</h2>
            <p>{pub.street}</p>
            <div className="italic">{pub.city}, {pub.state}, {pub.country}</div>
        </div>
    })

    const prevPage = () => {
        if (page === 1) {
            setPage(1)
        } else {
            setPage(page - 1)
        }
    }

    return (
        <section className="flex flex-col">
            <h2 className="text-2xl">Breweries in you area</h2>
            <SearchBar />
            <section className="flex justify-center gap-10">
                <div className="flex flex-col mr-4">
                    {isLoading ? <div>Loading...</div> : <div className="flex flex-col gap-5">{nearbyBreweries}</div>}
                    <div className="flex gap-2">
                        {page === 1 ? (<div className="invisible">{'<'}</div>) : (<button onClick={prevPage}>{'<'}</button>) }
                        <div className="font-bold">{page}</div>
                        <button onClick={() => setPage(page + 1)}>{'>'}</button>
                    </div>
                </div>
                <Map />
            </section>
        </section>
    )
}