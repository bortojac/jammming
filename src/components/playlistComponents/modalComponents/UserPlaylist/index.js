import { connect } from 'react-redux';
import UserPlaylist from './UserPlaylist';
import { getTracksLoadingFlag, getPlaylistTracks } from '@@store/selectors';
import {
  updatePlaylistName,
  fetchPlaylistTracks
} from '@@store/actions';


const mapStateToProps = state => {
  return {
    tracksLoading: getTracksLoadingFlag(state),
    tracks: getPlaylistTracks(state) 
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onNameChange: name => dispatch(updatePlaylistName(name)),
    fetchPlaylistTracks: playlistID => dispatch(fetchPlaylistTracks(playlistID))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPlaylist);