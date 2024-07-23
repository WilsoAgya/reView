import { useState } from 'react'
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Home from './Home.jsx';
import Results from './Results.jsx';
import { Routes, Route, BrowserRouter} from 'react-router-dom'


function App() {
  

  return (
    <BrowserRouter>
     <Routes>
     <Route path='/' element={<Login />} />
     <Route path='/login' element={<Login />} />
     <Route path='/signup' element={<Signup />} />
     <Route path='/home' element={<Home />} />
     <Route path='/results' element={<Results />} />
     </Routes>
    </BrowserRouter>
    
  )
}

export default App;
