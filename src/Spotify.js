const clientId = '8b4f0ee22b4c4e388a7a9572bb0baee1';
const redirectUri = 'http://localhost:3000/';
let accessToken;

const Spotify = {
    getAccessToken() {
      if (accessToken) return accessToken; // Return the token if already set
  
      // Check if the token is in the URL
      const tokenMatch = window.location.href.match(/access_token=([^&]*)/);
      const expiresMatch = window.location.href.match(/expires_in=([^&]*)/);
  
      if (tokenMatch && expiresMatch) {
        accessToken = tokenMatch[1];
        const expiresIn = Number(expiresMatch[1]);
  
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
        if (!accessToken) return;
    
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
  };
  
  export default Spotify;