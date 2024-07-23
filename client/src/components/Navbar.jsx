import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

let API_key = 'dfc7d82446703b884e41a688a9a1bb43';
let base_url = 'https://api.themoviedb.org/3';
let url = `${base_url}/discover/movie?sort_by=popularity.desc&api_key=${API_key}`;

export function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      navigate(`/results?query=${searchQuery}`);
    }
  };

  return (
    <div>
      <nav className="bg-gray-800 text-white flex justify-between items-center py-3 px-5">
        <div className="flex items-center space-x-5">
          <i className="fa-solid fa-bars"></i>
          <h1 className="text-xl font-bold">reView</h1>
        </div>
        <form>
          <div className="w-[400px] border border-gray-500 rounded flex items-center space-x-5">
            <input
              className="w-full bg-gray-800 outline-0 py-2 px-5 text-xs"
              value={searchQuery}
              type="text"
              placeholder="Search ..."
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
            />
            <i className="fa-solid fa-magnifying-glass px-2 text-gray-500"></i>
          </div>
        </form>
        <div className="flex items-center space-x-5 text-base">
          <i className="fa-solid fa-user"></i>
          <h2 className="text-gray-300 rounded py-1 px-5">Log out</h2>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
