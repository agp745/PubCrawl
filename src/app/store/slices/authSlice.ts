import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
    isAuthorized: boolean
}

const initialState: AuthState = {
    isAuthorized: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state: AuthState) => {
            state.isAuthorized = true
        },
        logout: (state: AuthState) => {
            state.isAuthorized = false
        }
    }
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer