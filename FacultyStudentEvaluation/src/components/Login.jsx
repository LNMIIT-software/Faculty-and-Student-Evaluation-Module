import React, {useState} from "react";
import { Link, useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login as authLogin } from "../store/authSlice";
import authService from "../appwrite/auth";
import { Button, Input } from './index'
import { useForm } from 'react-hook-form'

function Login(){
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState('')

    const login = async(data) => {
        setError('')
        try {
            console.log(data)
            const session = await authService.login(data)
            console.log(session)
            if(session){
                const userData = await authService.getCurrentUser()
                // console.log(userData)
                if(userData) dispatch(authLogin(userData))

                navigate('/')
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div
        className='flex items-center justify-center w-full mt-14'
        >
            <div className={` w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <h2 className="text-center text-2xl font-bold leading-tight">Log in to your account</h2>
            {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
            
            <form onSubmit={handleSubmit(login)} className="mt-8 ">
                <div className="space-y-5">
                    <Input 
                    label = 'Email'
                    placeholder="Enter your email"
                    type="email"
                    {...register("email", {
                        required: true,
                    })}
                    />
                    <Input 
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    {...register("password", {
                        required: true,
                    })}
                    />
                    <Button
                    type="submit"
                    className="w-full"
                    >Sign In</Button>
                </div>
            </form>
            </div>
        </div>
      )
}

//document.body.style.backgroundImage = 'url(https://www.lnmiit.ac.in/CLL/images/cll-1.jpg)';
//document.body.style.backgroundSize = 'cover';
// document.body.style.backgroundPosition = 'center';

export default Login