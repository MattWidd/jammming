import React, { useState } from 'react';
import './App.css';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Playlist from './Playlist';
import Spotify from './Spotify';

const mockTracks = [
  { id: 1, name: 'Track 1', artist: 'Artist 1', album: 'Album 1', uri: 'spotify:track:1' },
  { id: 2, name: 'Track 2', artist: 'Artist 2', album: 'Album 2', uri: 'spotify:track:2' },
  { id: 3, name: 'Track 3', artist: 'Artist 3', album: 'Album 3', uri: 'spotify:track:3' },
];

const App = () => {
  const [searchResults, setSearchResults] = useState(mockTracks);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState('My Playlist');

  const searchSpotify = (term) => {
    Spotify.search(term).then(tracks => {
      setSearchResults(tracks);
    });
  };

  const addTrack = (track) => {
    if (playlistTracks.find(savedTrack => savedTrack.id === track.id)) return;
    setPlaylistTracks([...playlistTracks, track]);
  };

  const removeTrack = (track) => {
    setPlaylistTracks(playlistTracks.filter(savedTrack => savedTrack.id !== track.id));
  };

  const updatePlaylistName = (name) => setPlaylistName(name);

  const savePlaylist = () => {
    // Extract URIs from playlistTracks
    const trackURIs = playlistTracks.map(track => track.uri);

    console.log('Saving playlist...');
    console.log(`Name: ${playlistName}`);
    console.log(`Tracks: ${trackURIs}`);

    // Simulate saving the playlist to Spotify (mocked for now)
    setPlaylistName('My Playlist'); // Reset playlist name
    setPlaylistTracks([]);         // Clear the playlist
  };

  return (
    <div>
      <h1>Jammming</h1>
      <SearchBar onSearch={searchSpotify} />
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
          onSave={savePlaylist}
        />
      </div>
    </div>
  );
};

export default App;