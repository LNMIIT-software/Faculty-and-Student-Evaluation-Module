import React, {useState} from "react";
import { Link, useNavigate} from 'react-router-dom'
//import { useDispatch } from 'react-redux'
import authService from "../../appwrite/auth";
//import { login as authLogin } from "../../store/authSlice";
import {Button, Input} from '../index'
import { useForm } from 'react-hook-form'

function AddStudent(){
    const navigate = useNavigate()
//    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState('')

    const signup = async(data) => {
        console.log(data)
        setError('')
        try {
            const session = await authService.createAccount(data)
            console.log("ye hai signup function")
            console.log(session)
            if(session){
                navigate('/admin')
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className="bg-gradient-to-tr from-violet-300 to-pink-300  h-fit-content">
            <div className='flex items-center justify-center w-full pt-14'>
                <div className={` w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                    <h2 className="text-center text-2xl font-bold leading-tight">Enter details of the student</h2>
                    {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
                    
                    <form onSubmit={handleSubmit(signup)} className="mt-8 ">
                        <div className="space-y-5">
                            <Input 
                            className = "py-1"
                            label = 'ID'
                            placeholder="Enter student ID"
                            type="text"
                            {...register("id", {
                                required: true,
                            })}
                            />
                            <Input 
                            label = 'Name'
                            placeholder="Enter student name"
                            type="text"
                            {...register("name", {
                                required: true,
                            })}
                            />
                            <Input 
                            label = 'Email'
                            placeholder="Enter student email"
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
                            <Input 
                            label="subject 1"
                            type="text"
                            placeholder="Enter your first subject"
                            {...register("subject1", {
                                required: true,
                            })}
                            />
                            <Input 
                            label="faculty"
                            type="text"
                            placeholder="Enter the faculty"
                            {...register("faculty1", {
                                required: true,
                            })}
                            />
                            <Input 
                            label="subject 2"
                            type="text"
                            placeholder="Enter your second subject"
                            {...register("subject 1", {
                                required: true,
                            })}
                            />
                            <Input 
                            label="faculty"
                            type="text"
                            placeholder="Enter the faculty"
                            {...register("faculty2", {
                                required: true,
                            })}
                            />
                            <Button
                            type="submit"
                            className="w-full"
                            bgColor="bg-pink-600"
                            >Add Student</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
// document.body.style.backgroundImage = 'url(https://www.lnmiit.ac.in/CLL/images/cll-1.jpg)';
// document.body.style.backgroundSize = 'cover';

export default AddStudent