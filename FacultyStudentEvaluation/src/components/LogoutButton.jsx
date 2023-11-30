import React from 'react'
import authService from '../appwrite/auth'
import { logout } from '../store/authSlice'
import { useDispatch } from 'react-redux'

function LogoutBtn(){
    const dispatch = useDispatch()

    const logoutHandler = () => {
        //first logout from the database and then update the values in the store.
        authService.logout()
            .then(() => {
                dispatch(logout())
            })
    }

    return (
        <button
        onClick={logoutHandler}
        >Logout</button>
    )
}

export default LogoutBtn;
