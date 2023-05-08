import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setCoords, errCoords } from "../store/slices/locationSlice"
import type { AppDispatch, RootState } from "../store/store"
import axios from "axios"
import Map from "./Map"
  
export type Coordinates = {
    latitude: number,
    longitude: number,
}

type LocationInfo = {
    id: string
    name: string,
    street: string,
    city: string,
    state: string,
    country: string,
}
  
const getCoordinates = (dispatch: AppDispatch) => {
  
    const successCallback = (coordinates: GeolocationPosition) => {
      const { latitude, longitude } = coordinates.coords
      const location: Coordinates = {
        latitude: latitude,
        longitude: longitude
      }
      dispatch(setCoords(location))
    }
  
    const errorCallback = (err: GeolocationPositionError) => {
      dispatch(errCoords())
      console.log(err)
    }
  
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback,)
}

export default function PubSearch() {

    
    const { currentCoords, isLoading } = useSelector((state: RootState) => state.location)
    const dispatch = useDispatch()

    const [breweries, setBreweries] = useState([])

    useEffect(() => {
        getCoordinates(dispatch)
        fetchPubs(currentCoords.latitude, currentCoords.longitude)
    }, [dispatch])


    const fetchPubs = async (latitude: number, longitude: number) => {
        const { data } = await axios.get(`https://api.openbrewerydb.org/v1/breweries/?by_dist=${latitude},${longitude}&per_page=6`)
        console.log(data)
        setBreweries(data)
    }

    const nearbyBreweries = breweries.map((pub: LocationInfo) => {
        return <div key={pub.id}>
            <h2>{pub.name}</h2>
            <p>{pub.street}</p>
            <div>{pub.city}, {pub.state}, {pub.country}</div>
        </div>
    })

    const moreResults = () => {

    }
    
    return (
        <section className="flex flex-col">
            <h1>HELLO WORLD PUBSEARCH</h1>
            <h2 className="text-2xl">Breweries in you area</h2>
            {isLoading ? <div>Loading...</div> : <div className="flex flex-col gap-5">{nearbyBreweries}</div>}
            <button onClick={moreResults}>view more results</button>
            <Map />
        </section>
    
    )
}