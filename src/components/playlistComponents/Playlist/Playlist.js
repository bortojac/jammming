import React from 'react';
import PropTypes from 'prop-types'
import TrackList from '../../tracklistComponents/Tracklist/Tracklist';
import PlaylistModal from '../modalComponents/PlaylistModal';
import './playlist.css';

class Playlist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
        };
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.modalOpenFuncs = this.modalOpenFuncs.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.renderCheckMark = this.renderCheckMark.bind(this);
    }

    handleOpenModal() {
        this.setState({ modalIsOpen: true });
    }

    handleCloseModal() {
        this.setState({ modalIsOpen: false });
    }

    handleNameChange(event) {
        this.props.onNameChange(event.target.value);
    }

    modalOpenFuncs() {
        this.props.loadPlaylists();
        this.handleOpenModal();
    }

    handleSave() {
        // save to spotify
        let trackURIs = this.props.playlistTracks.map(track => track.uri);
        this.props.onSave(this.props.playlistName, trackURIs);
    }

    renderCheckMark() {
        // if saved state is true, render the checkmark
        if (this.props.saved) {
            return (
                <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56">
                    <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                    <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                </svg>);
        }
        else {
            return 'SAVE PLAYLIST';
        }
    }

    render() {
        return (
            <div className="Playlist">
                <input onChange={this.handleNameChange} value={this.props.playlistName} />
                <div className="playlistContainer">
                    <TrackList
                        tracks={this.props.playlistTracks}
                        isRemoval
                    />
                </div>
                <div className="buttonContainer">
                    <a onClick={this.handleSave} className="Playlist-button">{this.renderCheckMark()}</a>
                    <a onClick={this.modalOpenFuncs} className="Playlist-button">LOAD A PLAYLIST</a>
                </div>
                <PlaylistModal
                    closeModal={this.handleCloseModal}
                    modalIsOpen={this.state.modalIsOpen}
                />
            </div>
        );
    }
}

Playlist.propTypes = {
    loadPlaylists: PropTypes.func.isRequired,
    playlistTracks: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
            artist: PropTypes.string,
            album: PropTypes.string,
            uri: PropTypes.string
        }).isRequired
    ),
    playlistName: PropTypes.string.isRequired,
    onNameChange: PropTypes.func.isRequired
}

export default Playlist;