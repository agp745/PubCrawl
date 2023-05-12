import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Coordinates, getCoordinates } from "../app/location"
import { setCity } from "../app/store/slices/locationSlice"
import type { LocationInfo } from "../app/location"
import type { RootState } from "../app/store/store"
import axios from "axios"

export type CityCoordinates = {
    coordinates: Coordinates,
    city: string
}

type SearchBarProps = {
    onCityCoordinates: (coords: CityCoordinates) => void
}

function StatesOptions() {

    return <>
        <option value="">state (US ONLY)</option>
        <option value="Alabama">Alabama</option>
        <option value="Alaska">Alaska</option>
        <option value="Arizona">Arizona</option>
        <option value="Arkansa">Arkansa</option>
        <option value="California">California</option>
        <option value="Colorado">Colorado</option>
        <option value="Connecticut">Connecticut</option>
        <option value="Deleware">Deleware</option>
        <option value="Florida">Florida</option>
        <option value="Georgia">Georgia</option>
        <option value="Hawaii">Hawaii</option>
        <option value="Idaho">Idaho</option>
        <option value="Illinois">Illinois</option>
        <option value="Indiana">Indiana</option>
        <option value="Iowa">Iowa</option>
        <option value="Kansas">Kansas</option>
        <option value="Kentucky">Kentucky</option>
        <option value="Louisiana">Louisiana</option>
        <option value="Maine">Maine</option>
        <option value="Maryland">Maryland</option>
        <option value="Massachusetts">Massachusetts</option>
        <option value="Michigan">Michigan</option>
        <option value="Minnesota">Minnesota</option>
        <option value="Mississippi">Mississippi</option>
        <option value="Missouri">Missouri</option>
        <option value="Montana">Montana</option>
        <option value="Nebraska">Nebraska</option>
        <option value="Nevada">Nevada</option>
        <option value="NewHampshire">New Hampshire</option>
        <option value="NewJersey">New Jersey</option>
        <option value="NewMexico">New Mexico</option>
        <option value="NewYork">New York</option>
        <option value="NorthCarolina">North Carolina</option>
        <option value="NorthDakota">North Dakota</option>
        <option value="Ohio">Ohio</option>
        <option value="Oklahoma">Oklahoma</option>
        <option value="Oregon">Oregon</option>
        <option value="Pennsylvania">Pennsylvania</option>
        <option value="RhodeIsland">Rhode Island</option>
        <option value="SouthCarolina">South Carolina</option>
        <option value="SouthDakota">South Dakota</option>
        <option value="Tennessee">Tennessee</option>
        <option value="Texas">Texas</option>
        <option value="Utah">Utah</option>
        <option value="Vermont">Vermont</option>
        <option value="Virginia">Virginia</option>
        <option value="Washington">Washington</option>
        <option value="WestVirginia">West Virginia</option>
        <option value="Wisconsin">Wisconsin</option>
        <option value="Wyoming">Wyoming</option>
    </>
}

function SearchBar({ onCityCoordinates }:SearchBarProps) {

    const dispatch = useDispatch()
    const [search, setSearch] = useState({
        city: '',
        state: '',
        country: '',
        isSearching: false
    })

    const fetchCityCoords = async () => {
        toggleSearch()
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

    const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setSearch({
            ...search,
            [name]: value
        })
    }

    const toggleSearch = () => {
        setSearch({
            ...search,
            isSearching: !search.isSearching
        })
    }

    return (
        <>
            {search.isSearching ? (
                <section id="searchbar" className="fixed top-0 bottom-0 left-0 right-0 text-center bg-gray-500 bg-opacity-40 backdrop-blur-sm w-full h-full">
                    <div id="wrapper" className="flex flex-col gap-5 items-center mt-48">
                        <img src="/pubcrawl.svg" className="max-w-[10rem]"/>
                        <input type="text" placeholder="city" name="city" value={search.city} onChange={handleInput} className="px-2 py-0.5 rounded-md"/>
                        <select name="state" onChange={handleInput} className="px-2 py-0.5 rounded-md">
                            <StatesOptions />
                        </select>
                        <input type="text" placeholder="country (optional)" name="country" value={search.country} onChange={handleInput} className="px-2 py-0.5 rounded-md"/>
                        <button onClick={fetchCityCoords}><img src="/search-icon.svg" className="max-w-[3rem] active:scale-95"/></button>
                    </div>
                </section>
            ) : (
                <button onClick={toggleSearch}><img src="/search-icon.svg" className="max-w-[2rem] ml-3 active:scale-95"/></button>
                )}
        </>
    )
}

export default function PubSearch() {

    const { currentCoords, isLoading, city, coordinatesObtained } = useSelector((state: RootState) => state.location)
    const dispatch = useDispatch()

    const [breweries, setBreweries] = useState([])
    const [page, setPage] = useState(1)

    useEffect(() => {
        if(!coordinatesObtained) {
            getCoordinates(dispatch)
        }
    }, [])

    useEffect(() => {
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
        return <div key={pub.id} id="pubCard" className="bg-white w-[90%] rounded-xl p-5 shadow-xl hover:scale-105 transition duration-300 ease-in-out">
            <a href={pub.website_url} target="_blank">
                <h2 className="font-bold">{pub.name}</h2>
                <p>{pub.street}</p>
                <div className="italic">{pub.city}, {pub.state}, {pub.country}</div>
            </a>
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
            <div id="top" className="flex p-3 justify-center">
                {city === undefined ? 
                (<h2 className="text-2xl font-light">breweries in your area</h2>):
                (<h2 className="text-2xl">breweries near <span className="font-bold text-4xl">{city}</span></h2>)}
                <SearchBar onCityCoordinates={handleCityCoordinates}/>
            </div>
            
            <section className="flex justify-center gap-10 ">
                <div className="flex flex-col">
                    {isLoading ? (<><img src="/beer-cheers-gif.webp" /><div>Loading...</div></>) : <div className="flex flex-col gap-5 items-center">{nearbyBreweries}</div>}
                    <div className="flex gap-2 justify-center mt-5 pb-7">
                        {page === 1 ? (<div className="invisible"><img src="/left-arrow.svg" alt="<" className="max-w-[2rem]"/></div>) : (<button onClick={prevPage}><img src="/left-arrow.svg" alt="<" className="max-w-[2rem] active:scale-95"/></button>) }
                        <div className="font-bold text-2xl mx-6">{page}</div>
                        <button onClick={() => setPage(page + 1)}><img src="/right-arrow.svg" alt=">" className="max-w-[2rem] active:scale-95"/></button>
                    </div>
                <div>
                    <p className="text-center p-4 -mt-5">Getting thirsty? Click <Link to={'/drinks'} className="text-green-600 font-semibold hover:underline">HERE</Link> to discover your next favorite beer</p>
                </div>
                </div>

            </section>
        </section>
    )
}