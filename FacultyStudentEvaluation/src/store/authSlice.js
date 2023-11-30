import { createSlice } from "@reduxjs/toolkit";

//user is to check if the user is faculty, student or admin.
const initialState = {
    status: false,
    user: null,
    userData: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true
            state.userData = action.payload
            state.user = action.payload
        },
        logout: (state) => {
            state.status = false,
            state.userData = null,
            state.user = null
        }
    }
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer