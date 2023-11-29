import React, {useState} from "react";
import { Link, useNavigate} from 'react-router-dom'
//import { useDispatch } from 'react-redux'
import authService from "../../appwrite/auth";
//import { login as authLogin } from "../../store/authSlice";
import {Button, Input} from '../index'
import { useForm } from 'react-hook-form'
import { useLocation } from "react-router-dom";
import service from "../../appwrite/configure";

function AddSubject(){
    const navigate = useNavigate()
    //const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState('')
    const location = useLocation()
    const formData = location.state

    const createEntry = async(data) => {
        console.log(formData.id, formData.username)
        console.log(data)
        try {
            const entry1 = await service.addEntry(formData.id, formData.username, data.subject1, data.faculty1, '')
            console.log(entry1)
            const entry2 = await service.addEntry(formData.id, formData.username, data.subject2, data.faculty2, '')
            console.log(entry2)

            navigate('/admin/add-student')
            //return entry
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className="bg-gradient-to-tr from-violet-300 to-pink-300  h-fit-content">
            <div className='flex items-center justify-center w-full pt-14'>
                <div className={` w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                    <h2 className="text-center text-2xl font-bold leading-tight">Enter the subjects</h2>
                    {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
                    
                    <form onSubmit={handleSubmit(createEntry)} className="mt-8 ">
                        <div className="space-y-5">
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
                            {...register("subject2", {
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
                            >Add</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
// document.body.style.backgroundImage = 'url(https://www.lnmiit.ac.in/CLL/images/cll-1.jpg)';
// document.body.style.backgroundSize = 'cover';
export default AddSubject