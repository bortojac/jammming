import { connect } from 'react-redux';
import CurrentPlaylists from './CurrentPlaylists';


const mapStateToProps = state => {
  return {
    loading: state.loadPlaylists.loading,
    currentPlaylists: state.loadPlaylists.currentPlaylists
  };
}

export default connect(mapStateToProps)(CurrentPlaylists);
