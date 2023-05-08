import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Coordinates } from "../../components/PubSearch";

export interface LocationState {
    isLoading: boolean,
    currentCoords: Coordinates
}

const initialState: LocationState = {
    isLoading: true,
    currentCoords: {
        latitude: 0,
        longitude: 0
    }
}

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
        }
    }
})

export const { setCoords, errCoords } = locationSlice.actions

export default locationSlice.reducer