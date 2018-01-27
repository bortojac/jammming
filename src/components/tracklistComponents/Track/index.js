import { connect } from 'react-redux';
import Track from './Track';
import { addTrack, removeTrack } from '@@store/actions';
import { getPlaylistTracks } from '@@store/selectors';


const mapStateToProps = state => ({
    playlistTracks: getPlaylistTracks(state)
})

const mapDispatchToProps = dispatch => {
    return {
        onAdd: track => dispatch(addTrack(track)),
        onRemove: track => dispatch(removeTrack(track))
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Track);
