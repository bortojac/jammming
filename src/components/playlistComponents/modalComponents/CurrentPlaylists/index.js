import { connect } from 'react-redux';
import CurrentPlaylists from './CurrentPlaylists';
import { getPlaylistsLoadingFlag, getCurrentPlaylists } from '@@store/selectors';


const mapStateToProps = state => {
  return {
    loading: getPlaylistsLoadingFlag(state),
    currentPlaylists: getCurrentPlaylists(state)
  };
}

export default connect(mapStateToProps)(CurrentPlaylists);
