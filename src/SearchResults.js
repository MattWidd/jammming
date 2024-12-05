import React from 'react';
import TrackList from './TrackList';
import './SearchResults.css';

const SearchResults = ({ searchResults, onAdd }) => (
    <div className="SearchResults">
      <TrackList tracks={searchResults} onAdd={onAdd} isRemoval={false} />
    </div>
  );
  
  export default SearchResults;