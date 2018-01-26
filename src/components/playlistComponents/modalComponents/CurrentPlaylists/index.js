import { connect } from 'react-redux';
import CurrentPlaylists from './CurrentPlaylists';
import { getLoading, getCurrentPlaylists } from '../../../../store/selectors';


const mapStateToProps = state => {
  return {
    loading: getLoading(state),
    currentPlaylists: getCurrentPlaylists(state)
  };
}

export default connect(mapStateToProps)(CurrentPlaylists);
