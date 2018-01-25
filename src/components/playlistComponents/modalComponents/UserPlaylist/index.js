import { connect } from 'react-redux';
import UserPlaylist from './UserPlaylist';
import {
  updatePlaylistName,
  getPlaylistTracks
} from '../../../../actions';


const mapStateToProps = state => {
  return {
    tracksLoading: state.playlistTracks.tracksLoading,
    tracks: state.playlistTracks.tracks
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onNameChange: name => dispatch(updatePlaylistName(name)),
    getPlaylistTracks: playlistID => dispatch(getPlaylistTracks(playlistID))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPlaylist);