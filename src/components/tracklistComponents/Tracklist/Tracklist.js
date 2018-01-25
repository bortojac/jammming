import React from 'react';
import PropTypes from 'prop-types';
import './tracklist.css';
import Track from '../Track';

// Tracklist receives props from Playlist or SearchResults depending on where it is rendered
const Tracklist = ({ tracks, isRemoval }) => {
    return (
        <div className="Tracklist">
            {tracks.map((track, index) => {
                return <Track
                    key={index}
                    track={track}
                    isRemoval={isRemoval}
                />;
            })}
        </div>
    );
}

Tracklist.propTypes = {
    tracks: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
            artist: PropTypes.string,
            album: PropTypes.string,
            uri: PropTypes.string
        }).isRequired
    ),
    isRemoval: PropTypes.bool.isRequired
}

export default Tracklist;
