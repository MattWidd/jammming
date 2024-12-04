import React from 'react';
import TrackList from './TrackList';
import './PlayList.css';

const Playlist = ({ playlistName, playlistTracks, onRemove, onNameChange }) => {
    const handleNameChange = (e) => onNameChange(e.target.value);
  
    return (
      <div className="Playlist">
        <input 
          value={playlistName} 
          onChange={handleNameChange} 
        />
        <TrackList 
          tracks={playlistTracks} 
          onRemove={onRemove} 
          isRemoval={true} 
        />
        <button>SAVE TO SPOTIFY</button>
      </div>
    );
  };
  
  export default Playlist;