import React, {useState} from "react";
import { Link, useNavigate} from 'react-router-dom'
//import { useDispatch } from 'react-redux'
import authService from "../../appwrite/auth";
//import { login as authLogin } from "../../store/authSlice";
import {Button, Input} from '../index'
import { useForm } from 'react-hook-form'
import { useSelector } from "react-redux";
import authSlice from "../../store/authSlice";

function AddStudent(){
    const navigate = useNavigate()
    const {register, handleSubmit, getValues} = useForm()
    const [error, setError] = useState('')
    const [formData, setFormData] = useState({})

    const signup = async(data) => {
        console.log(data)
        setFormData(data)
        console.log("this is the formData")
        console.log(formData)
        setError('')
        try {
            const session = await authService.createAccount(data)
            console.log("ye hai signup function")
            console.log(session)
            
            if(session){
                navigate('/admin/add-student/add-subject', {state: formData})
            }
            // try {
            //     console.log({id, username, subject1, faculty1})
            //     const entry = await service.addEntry({id, username, subject1, faculty1})
            //     console.log(entry)
            // } catch (error) {
            //     setError(error.message)
            // }
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
                            {...register("username", {
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
                            {/* <Input 
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
                            /> */}
                            <Button
                            type="submit"
                            className="w-full"
                            bgColor="bg-pink-600"
                            onClick={() => {
                                setFormData(getValues())
                            }}
                            >Add Subjects</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
// document.body.style.backgroundImage = 'url(https://www.lnmiit.ac.in/CLL/images/cll-1.jpg)';
// document.body.
export const formData = AddStudent
export default AddStudent