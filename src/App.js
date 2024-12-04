import React, { useState } from 'react';
import './App.css';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Playlist from './Playlist';

const mockTracks = [
  { id: 1, name: 'Track 1', artist: 'Artist 1', album: 'Album 1' },
  { id: 2, name: 'Track 2', artist: 'Artist 2', album: 'Album 2' },
  { id: 3, name: 'Track 3', artist: 'Artist 3', album: 'Album 3' },
];

const App = () => {
  const [searchResults, setSearchResults] = useState(mockTracks);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState('My Playlist');

  const addTrack = (track) => {
    if (playlistTracks.find(savedTrack => savedTrack.id === track.id)) return;
    setPlaylistTracks([...playlistTracks, track]);
  };

  const removeTrack = (track) => {
    setPlaylistTracks(playlistTracks.filter(savedTrack => savedTrack.id !== track.id));
  };

  const updatePlaylistName = (name) => setPlaylistName(name);

  return (
    <div>
      <h1>Jammming</h1>
      <SearchBar onSearch={(query) => console.log(query)} />
      <div className="App-playlist">
        <SearchResults 
          searchResults={searchResults} 
          onAdd={addTrack} 
        />
        <Playlist
          playlistName={playlistName}
          playlistTracks={playlistTracks}
          onRemove={removeTrack}
          onNameChange={updatePlaylistName}
        />
      </div>
    </div>
  );
};

export default App;