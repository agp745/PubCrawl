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
    ibu: number,
    ph: number,
    ebc: number,
    srm: number,
    attenuation_level: number,
    volume: {
        value: number,
        unit: string
    },
    food_pairing: string[],
    brewers_tips: string
}
interface DrinksState {
    drink: Drink,
    drinksList: Drink[],
    isLoading: boolean
}

export const fetchRandomBeer = createAsyncThunk('drinks/fetchBeers', async () => {
    try {
        const { data } = await axios(`https://api.punkapi.com/v2/beers/random`)
        return data[0]
    } catch (e) {

    }
})


const initialState: DrinksState = {
    drink: {
        abv: 0,
        brewers_tips: '',
        description: '',
        first_brewed: '',
        food_pairing: [''],
        ibu: 0,
        id: 0,
        image_url: '',
        name: '',
        tagline: '',
        ph: 0,
        ebc: 0,
        srm: 0,
        attenuation_level: 0,
        volume: {
            unit: '',
            value: 0
        }
    },
    drinksList: [],
    isLoading: false,
}

const drinksSlice = createSlice({
    name: 'drinks',
    initialState,
    reducers: {
        setDrinkList: (state, action: PayloadAction<Drink[]>) => {
            state.drinksList = action.payload
        },
        setDrink: (state, action: PayloadAction<Drink>) => {
            state.drink = action.payload
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchRandomBeer.pending, (state: DrinksState) => {
            state.isLoading = true
        }),
        builder.addCase(fetchRandomBeer.rejected, (state: DrinksState) => {
            state.isLoading = false
        }),
        builder.addCase(fetchRandomBeer.fulfilled, (state: DrinksState, action: PayloadAction<Drink>) => {
            state.isLoading = false
            state.drink = action.payload
        })
    },
})

export const { setDrinkList, setDrink } = drinksSlice.actions

export default drinksSlice.reducer