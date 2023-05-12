import { setCoords, errCoords } from "../app/store/slices/locationSlice"
import { useSelector } from "react-redux"
import type { AppDispatch } from "../app/store/store"

export type Coordinates = {
    latitude: number,
    longitude: number,
}

export type LocationInfo = {
    id: string
    name: string,
    street: string,
    city: string,
    state: string,
    country: string,
    website_url: string | undefined
}
  
export const getCoordinates = (dispatch: AppDispatch) => {
  
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
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback)
}