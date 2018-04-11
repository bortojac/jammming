import { connect } from 'react-redux';
import Playlist from './Playlist';
import { getPlaylistTracks, getPlaylistName, getSavePlaylistFlag } from '@@store/selectors';
import {
  updatePlaylistName,
  saveToSpotify,
  loadPlaylists
} from '@@store/actions';


const mapStateToProps = state => {
  return {
    playlistTracks: getPlaylistTracks(state),
    playlistName: getPlaylistName(state),
    saved: getSavePlaylistFlag(state)//,
   // currentPlaylists: state.currentPlaylists
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
