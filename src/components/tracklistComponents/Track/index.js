import { connect } from 'react-redux';
import Track from './Track';
import { addTrack, removeTrack } from '../../../actions';


const mapStateToProps = state => ({
    playlistTracks: state.playlistTracks.tracks
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
