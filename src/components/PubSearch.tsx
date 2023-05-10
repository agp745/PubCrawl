import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Coordinates, getCoordinates } from "../app/location"
import { setCity } from "../app/store/slices/locationSlice"
import type { LocationInfo } from "../app/location"
import type { RootState } from "../app/store/store"
import axios from "axios"
import Map from "./Map"

export type CityCoordinates = {
    coordinates: Coordinates,
    city: string
}

type SearchBarProps = {
    onCityCoordinates: (coords: CityCoordinates) => void
}

function SearchBar({ onCityCoordinates }:SearchBarProps) {

    const dispatch = useDispatch()
    const [search, setSearch] = useState({
        city: '',
        state: '',
        country: '',
    })

    const fetchCityCoords = async () => {
        const { data } = await axios(`https://api.api-ninjas.com/v1/geocoding?city=${search.city}`, {
            headers: {
                'X-Api-Key': import.meta.env.VITE_GEOCODE_API_KEY
            }
        })
        if (data.length > 0) {
            const city: CityCoordinates = {
                coordinates : {
                    latitude: data[0].latitude,
                    longitude: data[0].longitude,
                },
                city: data[0].name
            }
            dispatch(setCity(city))
            onCityCoordinates(city)
        } else {
            console.log('err: city not found')
        }
    }

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setSearch({
            ...search,
            [name]: value
        })
    }

    return (
        <>
            <input type="text" placeholder="city" name="city" value={search.city} onChange={handleInput}/>
            <input type="text" placeholder="state (optional)" name="state" value={search.state} onChange={handleInput}/>
            {/* <input type="text" placeholder="country (optional)" name="country" value={search.country} onChange={handleInput}/> */}
            <button onClick={fetchCityCoords}>Search</button>
        </>
    )
}




export default function PubSearch() {

    const { currentCoords, isLoading, city } = useSelector((state: RootState) => state.location)
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
        const { data } = await axios(`https://api.openbrewerydb.org/v1/breweries/?by_dist=${latitude},${longitude}&page=${page}&per_page=6`)
        setBreweries(data)
    }

    const handleCityCoordinates = (coords: CityCoordinates): void => {
        setPage(1)
        fetchPubs(coords.coordinates.latitude, coords.coordinates.longitude, page)    
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
            {city === undefined ? 
            (<h2 className="text-2xl">Breweries in you area</h2>):
            (<h2 className="text-2xl">Breweries near {city}</h2>)}
            
            <SearchBar onCityCoordinates={handleCityCoordinates}/>
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