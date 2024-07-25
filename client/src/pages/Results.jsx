import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Modal from '../components/Modal.jsx';

let base_url = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_API_KEY; // Use REACT_APP_ prefix

export function Results() {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  console.log(API_KEY);

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
            <Modal open={open} onClose={() => setOpen(false)}>
  <div className="flex flex-col lg:flex-row gap-4 p-4 md:w-[50vw] lg:w-[80vw] ">
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
      <textarea className=" border border-gray-800 w-full h-48" placeholder="Enter Text" />
      <button>Submit</button>
    </div>
  </div>
</Modal>

          </div>
        </ul>
      </div>
    </div>
  );
}


export default Results;