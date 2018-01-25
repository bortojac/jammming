import { connect } from 'react-redux';
import Playlist from './Playlist';
import {
  updatePlaylistName,
  saveToSpotify,
  loadPlaylists
} from '../../../actions';


const mapStateToProps = state => {
  return {
    playlistTracks: state.playlistTracks.tracks,
    playlistName: state.playlistName.name,
    saved: state.savePlaylist.saved,
    currentPlaylists: state.currentPlaylists
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onNameChange: name => dispatch(updatePlaylistName(name)),
    onSave: (playlistName, trackURIs) => dispatch(saveToSpotify(playlistName, trackURIs)),
    loadPlaylists: () => dispatch(loadPlaylists())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Playlist);
