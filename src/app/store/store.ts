import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "./slices/locationSlice";
import drinksReducer from "./slices/drinksSlice";
import authReducer from "./slices/authSlice";

export const store = configureStore({
    reducer: {
        location: locationReducer,
        drinks: drinksReducer,
        auth: authReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch