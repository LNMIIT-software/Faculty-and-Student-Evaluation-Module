import React, {useState} from "react";
import { Link, useNavigate} from 'react-router-dom'
//import { useDispatch } from 'react-redux'
import authService from "../../appwrite/auth";
//import { login as authLogin } from "../../store/authSlice";
import {Button, Input} from '../index'
import { useForm } from 'react-hook-form'
import { useSelector } from "react-redux";
import authSlice from "../../store/authSlice";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function NotifyError( message ){
    toast.error(message, {
        position: toast.POSITION.TOP_LEFT
    });
}

function AddStudent(){

    const [hasErrors, setHasErrors] = useState(false);

    const onSubmit = async (data) => {
        if (hasErrors) {
        NotifyError("Form submission failed. Please fix the errors.");
        return;
        }

    };

    const navigate = useNavigate()
    const {register, handleSubmit, getValues} = useForm()
    const [error, setError] = useState('')
    const [formData, setFormData] = useState({})

    const signup = async (data) => {
        console.log(data);
        setFormData(data);
        console.log("this is the formData");
        console.log(formData);
        setError('');
    
        try {
            if (hasErrors) {
                NotifyError("Form submission failed. Please fix the errors.");
                return;
            }
    
            const isExistingStudent = await checkExistingStudent(data);
    
            if (isExistingStudent) {
                return; 
            }
    
           
            const session = await authService.createAccount(data);
            console.log("ye hai signup function");
            console.log(session);
    
            if (session) {
                navigate('/admin/add-student/add-subject', { state: formData });
            }
        } catch (error) {
            // Handle errors
            console.error("Error during signup:", error);
            const errorMessage = error.message || "An error occurred during signup.";
            setError(errorMessage);
        }
    };
    
    const checkExistingStudent = async (data) => {
        try {
            const existingStudentByEmail = await authService.account.list({
                email: data.email,
            });
    
            if (existingStudentByEmail.users.length > 0) {
                NotifyError("A student with this email already exists!");
                return true; 
            }
    
            
            const existingStudentById = await authService.account.get(data.id);
    
            if (existingStudentById) {
                NotifyError("A student with this ID already exists!");
                return true; 
            }
    
            return false;
        } catch (error) {
            console.error("Error checking existing student:", error);
            return false;
        }
    };

    return (
        <div className="bg-gradient-to-tr from-violet-300 to-pink-300  h-fit-content">
            <div className='flex items-center justify-center w-full pt-14'>
                <div className={` w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                    <h2 className="text-center text-2xl font-bold leading-tight">Enter details of the student</h2>
                    {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}

                    <ToastContainer />

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
                                validate: (value) => {
                                    // Regular expression to check for only string inputs.
                                    const onlyLettersRegex = /^[A-Za-z\s]+$/;

                                    if (!onlyLettersRegex.test(value)) {
                                        NotifyError("Invalid input for name! Only string input allowed.");
                                        setHasErrors(true); 
                                    }

                                    setHasErrors(false); 
                                    return true;
                                },
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


export const formData = AddStudent
export default AddStudent