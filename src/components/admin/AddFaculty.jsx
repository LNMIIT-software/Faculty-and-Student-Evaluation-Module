import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Button, Input} from '../index'
import authService from "../../appwrite/auth";
import { useForm } from 'react-hook-form'


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function NotifyError( message ){
    toast.error(message, {
        position: toast.POSITION.TOP_LEFT
    });
}


function AddFaculty(){

    const [hasErrors, setHasErrors] = useState(false);

    const onSubmit = async (data) => {
        // Your form submission logic here
        // ...

        // If there are errors, do not proceed with form submission
        if (hasErrors) {
            NotifyError("Form submission failed. Please fix the errors.");
            return;
        }

        // Proceed with form submission logic
        // ...
    };

    const navigate = useNavigate()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState('')

    const signup = async(data) => {
        setError('')
        console.log(data)

        try {

            // If there are errors, do not proceed with form submission
            if (hasErrors) {
                NotifyError("Form submission failed. Please fix the errors.");
                return;
            }

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

                    <ToastContainer />
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
                            {...register("username", {
                                required: true,
                                validate: (value) => {
                                    // Regular expression to check for only string inputs.
                                    const onlyLettersRegex = /^[A-Za-z\s]+$/;

                                    if (!onlyLettersRegex.test(value)) {
                                        NotifyError("Invalid input for name! Only string input allowed.");
                                        setHasErrors(true); // Set the state to indicate validation errors
                                        return false; // Return false to indicate validation failure
                                    }

                                    setHasErrors(false); // Set the state to indicate no validation errors
                                    return true;
                                },
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
                            >Add Faculty</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddFaculty