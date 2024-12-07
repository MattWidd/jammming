const clientId = '8b4f0ee22b4c4e388a7a9572bb0baee1';
const redirectUri = 'http://localhost:3000/';
let accessToken;

const Spotify = {
    getAccessToken() {
      if (accessToken) {
        console.log("Access token exists:", accessToken)
        return accessToken; // Return the token if already set
      }
      // Check if the token is in the URL
      const tokenMatch = window.location.href.match(/access_token=([^&]*)/);
      const expiresMatch = window.location.href.match(/expires_in=([^&]*)/);
  
      if (tokenMatch && expiresMatch) {
        accessToken = tokenMatch[1];
        const expiresIn = Number(expiresMatch[1]);

         // Log token info
    console.log("Access token from URL:", accessToken);
    console.log("Expires in:", expiresIn);
  
        // Clear the token from the URL to avoid issues
        window.setTimeout(() => (accessToken = ''), expiresIn * 1000);
        window.history.pushState('Access Token', null, '/');
        return accessToken;
      } else {
        // Redirect to Spotify for authorization
        const scope = 'playlist-modify-public';
        const authUrl = `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientId}&scope=${encodeURIComponent(
          scope
        )}&redirect_uri=${encodeURIComponent(redirectUri)}`;
        window.location = authUrl;
      }
    },
    search(term) {
        const accessToken = this.getAccessToken();
          // If no token is available yet, wait and retry
        if (!accessToken) {
            console.warn('Access token not available yet. Retrying in 500ms...');
            return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.search(term)); // Retry after 500ms
                }, 500);
            });
        }
    
        const url = `https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(term)}`;
    
        return fetch(url, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
          .then(response => response.json())
          .then(jsonResponse => {
            if (!jsonResponse.tracks) return [];
            return jsonResponse.tracks.items.map(track => ({
              id: track.id,
              name: track.name,
              artist: track.artists[0].name,
              album: track.album.name,
              uri: track.uri,
            }));
          });
      },
      savePlaylist(name, trackURIs) {
        if (!name || !trackURIs.length) return;
    
        const accessToken = this.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` };
    
        let userId;
    
        // Step 1: Get the user's Spotify ID
        return fetch('https://api.spotify.com/v1/me', { headers })
          .then(response => response.json())
          .then(jsonResponse => {
            userId = jsonResponse.id;
    
            // Step 2: Create a new playlist
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
              headers,
              method: 'POST',
              body: JSON.stringify({ name }),
            });
          })
          .then(response => response.json())
          .then(jsonResponse => {
            const playlistId = jsonResponse.id;
    
            // Step 3: Add tracks to the playlist
            return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
              headers,
              method: 'POST',
              body: JSON.stringify({ uris: trackURIs }),
            });
          });
      },
  };
  
  export default Spotify;