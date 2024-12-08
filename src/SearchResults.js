import React from 'react';
import TrackList from './TrackList';
import './SearchResults.css';

const SearchResults = ({ searchResults, onAdd ,playlistTracks, isPlaylistVisible}) => {
  const isActive = playlistTracks.length > 0 && isPlaylistVisible;
  return(<div className={`SearchResults ${isActive ? 'active' : 'disactivated'}`}>
      <TrackList tracks={searchResults} onAdd={onAdd} isRemoval={false} />
    </div>
  );
}
  
  export default SearchResults;