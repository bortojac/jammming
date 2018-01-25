import { connect } from 'react-redux';
import PlaylistModal from './PlaylistModal';
import {
  updatePlaylistName
} from '../../../../actions';


const mapStateToProps = state => {
  return {
    currentPlaylists: state.loadPlaylists.currentPlaylists
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onNameChange: name => dispatch(updatePlaylistName(name))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaylistModal);
