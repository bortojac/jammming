import React from 'react';
import Modal from 'react-modal';
import CurrentPlaylists from '../CurrentPlaylists';
import PropTypes from 'prop-types';
import './playlistModal.css';

Modal.setAppElement('#root');

const PlaylistModal = ({ modalIsOpen, closeModal }) => {
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
    closeModal: PropTypes.func.isRequired,
    modalIsOpen: PropTypes.bool.isRequired
}

export default PlaylistModal;