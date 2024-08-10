import React, { useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Modal from '../components/Modal.jsx';
import { FaStar } from 'react-icons/fa';
import "./App.css";
import axios from 'axios';



let base_url = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_API_KEY; // Use REACT_APP_ prefix

export function Results() {
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const userId = localStorage.getItem('userId');
  const [query, setQuery] = useState("");
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState({
    id:"",
    name: "",
    overview: "",
    img_path: "",
    review: "",
    rating: null
  });
  
  

  

  function reviewText(e) {
    const newValue = e.target.value;
    setSelectedMovie(m => ({ ...m, review: newValue }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const movieToSubmit = {
      movieReviews: {
        name: selectedMovie.title,
        img_path: selectedMovie.poster_path,
        rating: rating,
        overview: selectedMovie.overview,
        review: selectedMovie.review
      }
    };
    console.log(movieToSubmit);
  
    axios.post(`http://localhost:8001/home/${userId}`, movieToSubmit)
      .then(movie => {
        navigate('/home');
      })
      .catch(error => {
        console.error('Error posting data:', error);
      });
  
    
  }
  

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const queryvar = params.get('query');

    if (queryvar) {
      setQuery(queryvar);
      const searchUrl = `${base_url}/search/movie?api_key=${API_KEY}&query=${queryvar}`;
      console.log(searchUrl);
      fetch(searchUrl)
        .then(res => res.json())
        .then(data => {
          console.log(data.results);
          setResults(data.results);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  }, [location.search]);

  return (
    <div>
      <Navbar />
      <h1 className="text-4xl my-4 text-center">{`Search Results for ${query}`}</h1>
      
      <div className='w-full mx-auto px-4'>
        <ul className="my-5">
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[400px] gap-8'>
            {results.map(result => (
              <button
                key={result.id} // Make sure the button has a unique key
                className="mx-auto"
                onClick={() => {
                  setSelectedMovie(result); // Set selected movie
                  setOpen(true); // Open modal
                }}
              >
                <li className="text-gray-600">
                  <img
                    src={`https://image.tmdb.org/t/p/original/${result.poster_path}`}
                    alt={result.title}
                    width="200px"
                    className="mx-auto rounded transition duration-300 hover:border-blue-500 relative"
                  />
                  <p className="text-center">{result.title}</p>
                  <p className='text-center'>{result.release_date ? result.release_date.substring(0, 4) : "Unknown"}</p>
                </li>
              </button>
            ))}
          </div>
        </ul>
        <Modal open={open} onClose={() => setOpen(false)}>
          <div className="flex flex-col lg:flex-row gap-4 p-4 sm:w-[50vw] md:w-[50vw] lg:w-[80vw]">
            <div className="w-1/3">
              {selectedMovie && selectedMovie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/original/${selectedMovie.poster_path}`}
                  alt={selectedMovie.title}
                  className="rounded"
                  width="400px"
                />
              ) : (
                <p>No poster available</p>
              )}
            </div>
            <div className="md:flex-1">
              <h3 className="text-lg font-black text-gray-800 mb-2">
                {selectedMovie ? selectedMovie.title : 'Movie Name'}
              </h3>
              <p className="text-gray-700 text-md mb-4">
                {selectedMovie ? selectedMovie.overview : 'Movie Description'}
              </p>
              <form onSubmit={handleSubmit}>
                <textarea
                  className="border rounded border-gray-800 w-full h-48"
                  placeholder="Enter Text"
                  value={selectedMovie.review}
                  onChange={reviewText}
                />
                <div className="flex justify-between items-center">
                  <div className="flex">
                    {[...Array(5)].map((star, index) => {
                      const currentRating = index + 1;
                      return (
                        <label key={index}>
                          <input
                            type="radio"
                            name="rating"
                            value={currentRating}
                            onClick={() => setRating(currentRating)}
                            className="hidden"
                          />
                          <FaStar
                            className="star"
                            color={currentRating <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
                            size={30}
                            onMouseEnter={() => setHover(currentRating)}
                            onMouseLeave={() => setHover(null)}
                          />
                        </label>
                      );
                    })}
                  </div>
                  <button type="submit" className="bg-indigo-500 px-4 py-2 text-white rounded-lg self-end mt-4">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default Results;
