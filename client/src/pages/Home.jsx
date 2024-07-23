import React, {useState, useNavigate} from 'react';
import Navbar from '../components/Navbar.jsx';



function Home(){

    return(
        <div>
            <Navbar /> 
            <div className="m-5 p-5 lg:m-10 lg:p-10">
            <h1 className='font-bold text-4xl mb-5'>Your Movie Reviews</h1>
            <h3>Your movie review list is currently empty. Start searching for movies to review!</h3>
            </div>
        </div>
    )
}


export default Home;