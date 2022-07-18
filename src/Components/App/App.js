
import React from 'react';
import "./App.css";
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.state = {

      searchResults: [],
      playlistName: "New Playlist Name",
      playlistTracks: [],
      playlists: []};
  }
}
 addTrack(track) {
		if (this.state.playlistTracks.every(plTrack => plTrack.id !== track.id)) {
			// @Reviewer is that the preferred way for building the new track list? I wasn't sure if it is allowed to modify playlistTracks directly,
			// because it's part of the state.
			let newPlaylistTracks = this.state.playlistTracks.concat(track);
			this.setState({playlistTracks: newPlaylistTracks});
		}
 }
	
 removeTrack(track) {
		let newPlaylistTracks = this.state.playlistTracks.filter(plTrack =>
			plTrack.id !== track.id);
		this.setState({playlistTracks: newPlaylistTracks});
	}

  updatePlaylistName(newName) {
		this.setState({playlistName: newName});
	}

  savePlaylist() {
        let trackURIs = this.state.playlistTracks.map(track => track.uri);
        if (this.state.playlistName && trackURIs && trackURIs.length > 0) {
			Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
				console.log(`new playlist with '${this.state.playlistName}' and ${trackURIs.length} songs successful saved.`);
				this.setState({playlistName: 'New Playlist', playlistTracks: []});
			});
		}
  }
  
  search(searchTerm) {
        Spotify.search(searchTerm).then(tracks =>
            this.setState({searchResults: tracks}));
	}

 
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}
            onSearch={this.search}
            onAdd={this.addTrack}
             />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    );
  }



export default App;
