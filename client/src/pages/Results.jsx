import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';

let base_url = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_API_KEY; // Use REACT_APP_ prefix

export function Results() {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");
  const location = useLocation();

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
      <h1 className="text-4xl my-4">{`Search Results for ${query}`}</h1>
      <ul>
        {results.map(result => (
          <li key={result.id}>
            <img
              src={`https://image.tmdb.org/t/p/original/${result.poster_path}`}
              alt={result.title}
              width="200px"
            />
            {result.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Results;
