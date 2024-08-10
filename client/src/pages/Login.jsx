import React from 'react';
import { Link, useNavigate} from 'react-router-dom';
import {useState} from 'react';
import axios from 'axios';



const Login = () => {

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8001/login', { name, password })
            .then(result => {
                if (result.data.success) {
                    // Extract user ID from the response
                    const userId = result.data.user._id;
                    console.log('Logged in successfully. User ID:', userId);
                }
                console.log(result);
                navigate('/home');
            })
            .catch(err => console.log(err));
    }
    
    return (
        <div className="w-full h-screen flex flex-col md:flex-row">
            <div className='relative w-full md:w-1/2 h-1/2 md:h-full flex flex-col bg-sky-500'>
                <div className='absolute top-[25%] left-[25%] flex flex-col'>
                    <h1 className="text-4xl font-bold my-4">Welcome to reView</h1>
                </div>
            </div>

            <div className='w-full md:w-1/2 h-full flex flex-col bg-white p-20 justify-between'>
                <div className="w-full flex flex-col">
                    <div className="w-full flex flex-col">
                        <h1 className='text-3xl font-semibold mb-4'>Login</h1>
                        <p className='text-sm my-2'>Welcome Back! Please enter your details</p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className='w-full flex flex-col mt-5'>
                            <input 
                                type='username'
                                placeholder='Username'
                                className='w-full py-4 my-2 bg-transparent border-b border-sky-500 outline-none focus:outline-none'
                                onChange={(e) => setName(e.target.value)} 
                            />
                            <input 
                                type='password'
                                placeholder='Password'
                                className='w-full text-black py-4 my-2 bg-transparent border-b border-sky-500 outline-none focus:outline-none'
                                onChange={(e) => setPassword(e.target.value)} 
                            />
                        </div>
                
                        <div className='w-full flex items-center justify-between'>
                            <div className='w-full flex'>
                                <p className='text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2 my-2'>Forgot Password?</p>
                            </div>
                        </div>
                        <div className='w-full flex flex-col'>
                            <button className='w-full py-2 my-2 bg-sky-400 rounded-md p-4 text-center flex items-center justify-center'>
                                Log In
                            </button>
                            <Link to='/signup' className='w-full py-2 my-2 bg-white border border-sky-500 rounded-md p-4 text-center flex items-center justify-center'>
                                Register
                            </Link>
                        </div>
                    </form>
                </div>
                <div className='w-full flex items-center justify-center'>
                    <p className='text-sm font-normal text-black'>Don't have an account?<span className='font-semibold underline underline-offset-2 cursor-pointer'> Sign Up for free</span></p>
                </div>
            </div>
        </div>
    );
}

export default Login;
