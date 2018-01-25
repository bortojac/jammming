import React from 'react';
import PropTypes from 'prop-types';
import TrackList from '../../tracklistComponents/Tracklist/Tracklist';
import './searchResults.css';

const SearchResults = ({ searchResults }) => {
    return (
        <div className='SearchResults'>
            <h2>Results</h2>
            <div className="searchResultsContainer">
                <TrackList
                    tracks={searchResults}
                    isRemoval={false}
                />
            </div>
        </div>
    );
}

SearchResults.propTypes = {
    searchResults: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
            artist: PropTypes.string,
            album: PropTypes.string,
            uri: PropTypes.string
        }).isRequired
    )
}
export default SearchResults;