import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';

let API_key = 'dfc7d82446703b884e41a688a9a1bb43';
let base_url = 'https://api.themoviedb.org/3';

export function Results() {
  const [results, setResults] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('query');

    if (query) {
      const searchUrl = `${base_url}/search/movie?api_key=${API_key}&query=${query}`;
      fetch(searchUrl)
        .then(res => res.json())
        .then(data => {
          console.log(data.results);
          setResults(data.results);
        });
    }
  }, [location.search]);

  return (
    <div>
      <Navbar />
      <h1>Search Results</h1>
      <ul>
        {results.map(result => (
          <li key={result.id}>
            <img src={`https://image.tmdb.org/t/p/original/${result.poster_path}`} alt={result.title} width="200px"/>
            {result.title}  
            </li>
        ))}
      </ul>
    </div>
  );
}

export default Results;
