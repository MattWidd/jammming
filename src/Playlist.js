import React from 'react';
import TrackList from './TrackList';
import './PlayList.css';

const Playlist = ({ playlistName, playlistTracks, onRemove, onNameChange, onSave }) => {
    const handleNameChange = (e) => onNameChange(e.target.value);
  
    return (
      <div className="Playlist">
        <input 
          type="text"
          value={playlistName} 
          onChange={handleNameChange} 
        />
        <TrackList 
          tracks={playlistTracks} 
          onRemove={onRemove} 
          isRemoval={true} 
        />
        <button className="Playlist-save" onClick={onSave}>SAVE TO SPOTIFY</button>
      </div>
    );
  };
  
  export default Playlist;