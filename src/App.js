import React, { useState, useEffect  } from 'react';
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
  const [isPlaylistVisible, setIsPlaylistVisible] = useState(true);

  const mockTracks = [
    { id: 1, name: 'Track 1', artist: 'Artist 1', album: 'Album 1', uri: 'mock:uri1' },
    { id: 2, name: 'Bohemian Rhapsody', artist: 'Queen', album: 'A Night at the Opera', uri: 'mock:uri2' },
    { id: 3, name: 'Shape of You', artist: 'Ed Sheeran', album: '÷ (Divide)', uri: 'mock:uri3' },
    // Add more tracks as needed
  ];
  
  const searchSpotify = (term) => {
    console.log(`Search term: ${term}`);
  
    Spotify.search(term)
      .then((tracks) => {
        if (tracks && tracks.length > 0) {
          console.log('Tracks from Spotify:', tracks);
          setSearchResults(tracks);
          setIsSearchActive(true);
        } else {
          console.log('No tracks found, performing fuzzy search.');
          
          // If no Spotify results, fallback to fuzzy search
          const options = {
            keys: ['name', 'artist', 'album'],
            threshold: 0.3, // Adjust sensitivity
          };
  
          const fuse = new Fuse(mockTracks, options);
          const fuzzyResults = fuse.search(term).map((result) => result.item);
  
          setSearchResults(fuzzyResults);
          console.log(`Fuzzy search results for "${term}":`, fuzzyResults);
        }
      })
      .catch((error) => {
        console.error('Error with Spotify search:', error);
  
        // Optional fallback: Handle errors by using fuzzy search
        const options = {
          keys: ['name', 'artist', 'album'],
          threshold: 0.3,
        };
        const fuse = new Fuse(mockTracks, options);
        const fallbackResults = fuse.search(term).map((result) => result.item);
        setSearchResults(fallbackResults);
      });
  };

  // Trigger default search on first render
  useEffect(() => {
    console.log('Performing default search...');
    searchSpotify(''); // Replace '' with a default term if necessary
  }, []);


  const addTrack = (track) => {
    if (!playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      setPlaylistTracks(prevTracks => [...prevTracks, track]);
    }
  };

  const removeTrack = (track) => {
    setPlaylistTracks(prevTracks => prevTracks.filter(savedTrack => savedTrack.id !== track.id));
  };

  const updatePlaylistName = (name) => {
    setPlaylistName(name);
  };

  const savePlaylist = () => {
    const trackURIs = playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(playlistName, trackURIs).then(() => {
      console.log('Saving playlist...');
      console.log(`Name: ${playlistName}`);
      console.log(`Tracks: ${trackURIs}`);
      setPlaylistName('My Playlist'); // Reset playlist name
      setPlaylistTracks([]);         // Clear the playlist
    });
  };

  const togglePlaylistVisibility = () => {
    setIsPlaylistVisible((prevState) => !prevState);
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
          playlistTracks={playlistTracks}
          isPlaylistVisible={isPlaylistVisible}
        />
        {isPlaylistVisible && (
        <Playlist 
          playlistName={playlistName}
          playlistTracks={playlistTracks}
          onRemove={removeTrack}
          onNameChange={updatePlaylistName}
          onSave={savePlaylist}
        />
        )}
        <button className={`toggle-button 
    ${playlistTracks.length > 0 ? 'has-tracks' : 'no-tracks'} 
    ${playlistTracks.length > 0 && isPlaylistVisible ? 'visible' : 'not-visible'}`}
        onClick={togglePlaylistVisibility}
          >{isPlaylistVisible ? '▼' : '▲'}</button>
      </div>
      )}
    </div>
  );
};

export default App;