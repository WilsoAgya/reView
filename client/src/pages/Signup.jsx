import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'; // import uuid

function Signup() {
    //const [id, setId] = useState(uuidv4()); // generate random ID
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        //localStorage.setItem('userId', id); // Store UUID in localStorage
        axios.post('http://localhost:8001/signup', { name, password })
            .then(result => {
                console.log(result);
                navigate('/login');
            })
            .catch(err => console.log(err));
    }

  

    return (
        <div className="w-full h-screen flex flex-col md:flex-row">
            <div className='relative w-full md:w-1/2 h-1/2 md:h-full flex flex-col bg-sky-500'>
                <div className='absolute top-[25%] left-[10%] flex flex-col'>
                    <h1 className="text-4xl font-bold my-4">Welcome to reView</h1>
                </div>
            </div>

            <div className='w-full md:w-1/2 h-full flex flex-col bg-white p-20 justify-between'>
                <div className="w-full flex flex-col">
                    <div className="w-full flex flex-col">
                        <h1 className='text-3xl font-semibold mb-4'>Sign Up</h1>
                        <p className='text-sm my-2'>Create a new account!</p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className='w-full flex flex-col mt-5'>
                            <input 
                                type='text'
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
                        <div className='w-full flex flex-col my-4'>
                            <button className='w-full py-2 my-2 bg-sky-400 rounded-md p-4 text-center flex items-center justify-center'>
                                Create Account
                            </button>
                            <Link to='/login' className='w-full py-2 my-2 bg-white border border-sky-500 rounded-md p-4 text-center flex items-center justify-center'>
                                Already have an Account?
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;
