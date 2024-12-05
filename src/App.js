import React, { useState } from 'react';
import './App.css';
import Fuse from 'fuse.js';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Playlist from './Playlist';
import Spotify from './Spotify';

const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState('My Playlist');
  const [isSearchActive, setIsSearchActive] = useState(false);

  const mockTracks = [
    { id: 1, name: 'Track 1', artist: 'Artist 1', album: 'Album 1', uri: 'mock:uri1' },
    { id: 2, name: 'Bohemian Rhapsody', artist: 'Queen', album: 'A Night at the Opera', uri: 'mock:uri2' },
    { id: 3, name: 'Shape of You', artist: 'Ed Sheeran', album: '÷ (Divide)', uri: 'mock:uri3' },
    // Add more tracks as needed
  ];
  
  const searchSpotify = (term) => {
    Spotify.search(term).then(tracks => {
      if (tracks.length > 0) {
        setIsSearchActive(true);
        // If Spotify returns results, use them
        setSearchResults(tracks);
      } else {
        // If Spotify returns no results, use fuzzy search locally
        const options = {
          keys: ['name', 'artist', 'album'],
          threshold: 0.3, // Adjust sensitivity
        };
  
        const fuse = new Fuse(mockTracks, options);
        const fuzzyResults = fuse.search(term).map(result => result.item);
  
        setSearchResults(fuzzyResults);
        console.log(`Fuzzy search results for "${term}":`, fuzzyResults);
      }
    }).catch(error => {
      console.error('Error with Spotify search:', error);
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
    Spotify.savePlaylist(playlistName, trackURIs).then(() => {
    console.log('Saving playlist...');
    console.log(`Name: ${playlistName}`);
    console.log(`Tracks: ${trackURIs}`);

    // Simulate saving the playlist to Spotify (mocked for now)
    setPlaylistName('My Playlist'); // Reset playlist name
    setPlaylistTracks([]);         // Clear the playlist
   })
  };

  return (
    <div>
      <h1>Jammming</h1>
      <div className={`SearchBar-container ${isSearchActive ? 'top-right' : 'center'}`}>
      <SearchBar onSearch={searchSpotify} />
      </div>
      {searchResults.length > 0 && (
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
      )}
    </div>
  );
};

export default App;