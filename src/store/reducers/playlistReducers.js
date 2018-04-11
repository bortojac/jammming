import {
    ADD_TRACK,
    REMOVE_TRACK,
    UPDATE_PLAYLIST_NAME,
    PLAYLISTS_REQUEST,
    PLAYLISTS_RECIEVED,
    PLAYLIST_TRACKS_REQUEST,
    PLAYLIST_TRACKS_RECEIVED,
    SAVE_FINISHED,
    SAVE_NEEDED
} from '../actions/types';


// helper function for adding track. remember that 'state' here is going to be the slice of the state managed by playlistTracks()
function addTrack(state, track) {
    return Object.assign({}, state, {
        tracks: [
            ...state.tracks,
            track
        ]
    });
}

// helper function for removing track. remember that 'state' here is going to be the slice of the state managed by playlistTracks()
function removeTrack(state, track) {
    let filteredTracks = [...state.tracks.filter(playlistTrack => playlistTrack.id !== track.id)];
    return Object.assign({}, state, {
        tracks: filteredTracks,
    });
}

export const playlistTracks = (
    state = {
        tracks: [],
        tracksLoading: false
    }, action) => {
    switch (action.type) {
        case ADD_TRACK:
            return addTrack(state, action.track);
        case REMOVE_TRACK:
            return removeTrack(state, action.track);
        case PLAYLIST_TRACKS_REQUEST:
            return Object.assign({}, state, {
                tracksLoading: true
            })
        case PLAYLIST_TRACKS_RECEIVED:
            return Object.assign({}, state, {
                tracksLoading: true,
                tracks: action.tracks,
                trackURIs: action.trackURIs
            })
        default:
            return state;
    }
}

export const savePlaylist = (
    state = {
        saved: false,
        playlistName: '',
        playlistID: ''
    },
    action
) => {
    switch (action.type) {
        case SAVE_NEEDED:
            return Object.assign({}, state, {
                saved: false,
                playlistName: action.playlistName,
            });
        case SAVE_FINISHED:
            return Object.assign({}, state, {
                saved: true,
                playlistName: action.playlistName,
                playlistID: action.playlistID
            });
        default:
            return state;
    }
}

// this reducer governs the name of the playlist. the one managed by savePlaylist is in a different slice of the state that is just for documentation purposes
export const playlistName = (
    state = {
        name: 'New Playlist'
    },
    action
) => {
    switch (action.type) {

        case UPDATE_PLAYLIST_NAME:
            return Object.assign({}, state, {
                name: action.name
            });
        default:
            return state;
    }
}

export const loadPlaylists = (
    state = {
        loading: false,
        currentPlaylists: []
    },
    action
) => {
    switch (action.type) {
        case PLAYLISTS_REQUEST:
            return Object.assign({}, state, {
                loading: true
            });
        case PLAYLISTS_RECIEVED:
            return Object.assign({}, state, {
                loading: false,
                currentPlaylists: action.currentPlaylists
            });
        default:
            return state;
    }
}