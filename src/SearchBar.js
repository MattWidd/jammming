import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');
  
    const handleSearch = () => {
      onSearch(query);
    };

    const handleQueryChange = (e) => {
      setQuery(e.target.value);
    };
  
    return (
      <div className="SearchBar">
        <input
          type="text"
          placeholder="Enter a song, album, or artist"
          value={query}
          onChange={handleQueryChange}
        />
        <button onClick={handleSearch}>SEARCH</button>
      </div>
    );
  };
  
  export default SearchBar;