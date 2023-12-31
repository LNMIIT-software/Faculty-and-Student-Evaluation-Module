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
            const session = await authService.login(data)
            //console.log(session)
            if(session){
                const userData = await authService.getCurrentUser()
                console.log(" ye hai login wala userdata")
                console.log(userData)
                if(userData) dispatch(authLogin(userData))

                if(userData.$id === '6570c5901c8e157ce59a'){
                    navigate('/admin')
                }
                else if(userData.$id.charAt(0) === 'f'){
                    navigate('/faculty')
                }
                else{
                    navigate('/student')
                }
            }
        } catch (error) {
            setError(error.message)
        }
    }

    // const login = async(data) => {
    //     setError('');
    
    //     console.log(data);
    
    //     return authService.login(data)
    //     .then((session) => {
    //         console.log(session);
    
    //         if (session) {
    //         authService.getCurrentUser()
    //             .then((userData) => {
    //             // console.log(userData);
    //             if (userData) {
    //                 dispatch(authLogin(userData));
    //             }
    
    //             navigate('/');
    //             });
    //         }
    //     })
    //     .catch((error) => {
    //         setError(error.message);
    //     });
    // };
  

    return (
        <div>
            <div className='flex items-center justify-center w-full pt-14'>
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
                            bgColor="bg-pink-600"
                            >Sign In</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

document.body.style.backgroundImage = 'url(https://www.orchidfoundation.info/sites/default/files/2021-03/The%20LNM%20Institute%20of%20Information%20Technology%20-%20%5BLNMIIT%5D%2C%20Jaipur.png)';
document.body.style.backgroundSize = 'cover';

export default Login