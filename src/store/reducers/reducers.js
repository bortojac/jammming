import { combineReducers } from 'redux';
import { searchResults } from './searchReducers';
import { playlistTracks, savePlaylist, playlistName, loadPlaylists } from './playlistReducers';
import { token } from './authReducers';

const rootReducer = combineReducers({
  playlistTracks,
  searchResults,
  savePlaylist,
  playlistName,
  loadPlaylists,
  token
})

export default rootReducer
