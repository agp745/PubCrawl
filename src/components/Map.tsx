import React, { useMemo } from "react"
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"
import { useSelector } from "react-redux"
import { RootState } from "../app/store/store"

interface GoogleMapCenter {
    lat: number,
    lng: number
}

export default function Map() {

    const { currentCoords } = useSelector((state: RootState) => state.location)

    // const center = useMemo(() => ({
    //     lat: currentCoords.latitude,
    //     lng: currentCoords.longitude
    // }), [])
    
    const center: GoogleMapCenter = {
        lat: currentCoords.latitude,
        lng: currentCoords.longitude,
    } 

    const style: React.CSSProperties = {
        width: '400px',
        height: '400px'

    }

    const { isLoaded, loadError ,url } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    })

    if (!isLoaded) return <div>Loading...</div>

    return (
        <GoogleMap zoom={11} center={center} mapContainerStyle={style}>
            <Marker position={center}/>
        </GoogleMap>
    )


}