import React from 'react';
import Modal from 'react-modal';
import CurrentPlaylists from '../CurrentPlaylists';
import PropTypes from 'prop-types';
import './playlistModal.css';

Modal.setAppElement('#root');

const PlaylistModal = ({ modalIsOpen, closeModal, currentPlaylists, getPlaylistTracks, onNameChange }) => {
    return (
        <div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className="myModalDialog"
                overlayClassName="myOverlay"
                contentLabel="Example Modal"
                closeTimeoutMS={300}
            >
                <CurrentPlaylists
                    closeModal={closeModal}
                />
            </Modal>
        </div>
    );
}

PlaylistModal.propTypes = {
    getPlaylistTracks: PropTypes.func,
    currentPlaylists: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string
        }).isRequired
    ),
    closeModal: PropTypes.func.isRequired,
    onNameChange: PropTypes.func.isRequired,
    modalIsOpen: PropTypes.bool.isRequired
}

export default PlaylistModal;