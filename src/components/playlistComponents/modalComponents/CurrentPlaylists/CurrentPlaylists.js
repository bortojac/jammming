import React from 'react';
import PropTypes from 'prop-types';
import './currentPlaylists.css';
import _ from 'lodash';
import UserPlaylist from '../UserPlaylist';
import { RiseLoader } from 'react-spinners';


const CurrentPlaylists = ({ currentPlaylists, loading, closeModal}) => {

    return (
        <div className="playlistDiv">
            <h1 className="modalContentHeader">Select a Playlist to edit</h1>
            <RiseLoader
                color={'#123abc'}
                loading={loading}
            />
            <ul className="playlists">
                {_.map(currentPlaylists,
                    playlistObj => {
                        return <UserPlaylist
                            key={playlistObj.id}
                            playlistObj={playlistObj}
                            closeModal={closeModal}
                        />;
                    })
                }
            </ul>
        </div>
    );
}

CurrentPlaylists.propTypes = {
    currentPlaylists: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string
        }).isRequired
    ),
    closeModal: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
}


export default CurrentPlaylists;