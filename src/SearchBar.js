import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');
  
    const handleSearch = () => {
      onSearch(query);
    };
  
    return (
      <div className="SearchBar">
        <input
          type="text"
          placeholder="Enter a song, album, or artist"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>SEARCH</button>
      </div>
    );
  };
  
  export default SearchBar;