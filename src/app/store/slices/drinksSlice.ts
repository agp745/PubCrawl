import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Drink {
    id: number,
    name: string,
    tagline: string,
    first_brewed: string,
    description: string,
    image_url: string,
    abv: number,
    ibu: number;
    volume: {
        value: number,
        unit: string
    },
    food_pairing: string[],
    brewers_tips: string
}
interface DrinksState {
    drink: Drink | undefined,
    drinksList: Drink[],
    isLoading: boolean
}


// const { data } = await axios(`https://api.punkapi.com/v2/beers?per_page=3`)

export const fetchBeers = createAsyncThunk('drinks/fetchBeers', async () => {
    try {
        const { data } = await axios(`https://api.punkapi.com/v2/beers?per_page=3`)
        return data
    } catch (e) {

    }
})


const initialState: DrinksState = {
    drink: undefined,
    drinksList: [],
    isLoading: false,
}

const drinksSlice = createSlice({
    name: 'drinks',
    initialState,
    reducers: {
        setDrink: (state, action: PayloadAction<Drink>) => {
            state.drink = action.payload
        }
    },
    // extraReducers: {
    //     [fetchBeers.pending]: (state: DrinksState) => {
    //         state.isLoading = true
    //     },
    //     [fetchBeers.fulfilled]: (state: DrinksState, action: PayloadAction<Drink[]>) => {

    //         state.isLoading = false
    //     },
    //     [fetchBeers.rejected]: (state: DrinksState) => {
    //         state.isLoading = false
    //     }
    // }
    extraReducers(builder) {
        builder.addCase(fetchBeers.pending, (state: DrinksState) => {
            state.isLoading = true
        }),
        builder.addCase(fetchBeers.rejected, (state: DrinksState) => {
            state.isLoading = false
        }),
        builder.addCase(fetchBeers.fulfilled, (state: DrinksState, action: PayloadAction<Drink[]>) => {
            state.isLoading = false
            state.drinksList = action.payload
        })
    },
})

export const { setDrink } = drinksSlice.actions

export default drinksSlice.reducer