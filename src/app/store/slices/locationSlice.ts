import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Coordinates } from "../../location";
import type { CityCoordinates } from "../../../components/PubSearch";

export interface LocationState {
    isLoading: boolean,
    currentCoords: Coordinates,
    city: string | undefined,
}

const initialState: LocationState = {
    isLoading: true,
    currentCoords: {
        latitude: 0,
        longitude: 0
    },
    city: undefined,
}

export const fetchPubs = createAsyncThunk('location/fetchPubs', async() => {
    
})

const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {
        setCoords: (state, action: PayloadAction<Coordinates>) => {
            state.isLoading = false
            state.currentCoords = action.payload
        },
        errCoords: (state) => {
            state.isLoading = false
        },
        setCity: (state, action: PayloadAction<CityCoordinates>) => {
            state.isLoading = true
            state.currentCoords = action.payload.coordinates
            state.city = action.payload.city
            state.isLoading = false
        }
    }
})

export const { setCoords, errCoords, setCity } = locationSlice.actions

export default locationSlice.reducer