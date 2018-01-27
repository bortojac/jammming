import React from 'react';
import PropTypes from 'prop-types';
import './track.css';

class Track extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddTrack = this.handleAddTrack.bind(this);
        this.handleRemoveTrack = this.handleRemoveTrack.bind(this);
    }

    handleAddTrack() {
        if (!this.props.playlistTracks.map(playlistTrack => playlistTrack.id).includes(this.props.track.id)) {
            this.props.onAdd(this.props.track);
        } else { return }
    }

    handleRemoveTrack() {
        this.props.onRemove(this.props.track);
    }

    renderAddOrRemoveLink() {
        if (this.props.isRemoval) {
            return (<a onClick={this.handleRemoveTrack} className='Track-action'>-</a>);
        } else {
            // if the track is already in the playlist, don't put a + sign. For now we are not allowing duplicate tracks.
            // It makes it difficult to remove tracks separately by their ID.
            // Creating a unique key is probably outside the scope of this project, given the limited use cases for duplicates
            if (this.props.playlistTracks.map(playlistTrack => playlistTrack.id).includes(this.props.track.id)) {
                // return a checkmark
                return (<a onClick={this.handleAddTrack} className='Track-action'>&#10003;</a>);
            }
            return (<a onClick={this.handleAddTrack} className='Track-action'>+</a>)

        }
    }

    render() {
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{`${this.props.track.artist} | ${this.props.track.album}`}</p>
                </div>
                {this.renderAddOrRemoveLink()}
            </div>
        );
    }
}

Track.propTypes = {
    playlistTracks: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
            artist: PropTypes.string,
            album: PropTypes.string,
            uri: PropTypes.string
        }).isRequired
    ),
    track: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        artist: PropTypes.string,
        album: PropTypes.string,
        uri: PropTypes.string
    }).isRequired,
    onAdd: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    isRemoval: PropTypes.bool.isRequired
}

export default Track;