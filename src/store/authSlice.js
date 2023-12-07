import { createSlice } from "@reduxjs/toolkit";

//user is to check if the user is faculty, student or admin.
const initialState = {
    status: false,
    userData: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true
            state.userData = action.payload
        },
        logout: (state) => {
            state.status = false
            state.userData = null
        }
    }
})

//export const username = state => state.auth.userData.name
export const { login, logout } = authSlice.actions

export default authSlice.reducer