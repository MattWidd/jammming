import React from 'react';
import TrackList from './TrackList';
import './PlayList.css';

const Playlist = ({ playlistName, playlistTracks, onRemove, onNameChange, onSave }) => {

  const handleNameChange = (e) => onNameChange(e.target.value);

    
  let activeClass = 'disactivated';

  if (playlistTracks.length === 1) {
    activeClass = 'active1';
  } else if (playlistTracks.length === 2) {
    activeClass = 'active2';
  } else if (playlistTracks.length >= 3) {
    activeClass = 'active3';
  }
    return (
       <div className={`playList ${activeClass}`}>
        <TrackList 
          tracks={playlistTracks} 
          onRemove={onRemove} 
          isRemoval={true} 
        />
        <input 
          type="text"
          value={playlistName} 
          onChange={handleNameChange} 
        />
        <button className="Playlist-save" onClick={onSave}>SAVE TO SPOTIFY</button>
      </div>)
}
  export default Playlist;