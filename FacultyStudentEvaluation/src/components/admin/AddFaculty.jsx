import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Button, Input} from '../index'
import authService from "../../appwrite/auth";
import { useForm } from 'react-hook-form'

function AddFaculty(){
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState('')

    const signup = async(data) => {
        setError('')
        console.log(data)

        try {
            const session = await authService.createAccount(data)
            console.log(session)
            if(session){
                navigate('/admin')
            }
        } catch (error) {
            setError(error)
        }
    }

    return (
        <div className="bg-gradient-to-tr from-violet-300 to-pink-300  h-fit-content">
            <div className='flex items-center justify-center w-full pt-14'>
                <div className={` w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                    <h2 className="text-center text-2xl font-bold leading-tight">Enter the faculty details</h2>
                    {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
                    
                    <form onSubmit={handleSubmit(signup)} className="mt-8 ">
                        <div className="space-y-5">
                            <Input 
                            label = 'ID'
                            placeholder="Enter the faculty id"
                            type="text"
                            {...register("id", {
                                required: true,
                            })}
                            />
                            <Input 
                            label = 'Name'
                            placeholder="Enter the faculty name"
                            type="text"
                            {...register("name", {
                                required: true,
                            })}
                            />
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
                            bgColor="bg-pink-600"
                            >Sign In</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddFaculty