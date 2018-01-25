import {
    ADD_TRACK,
    REMOVE_TRACK,
    SAVE_NEEDED,
    SAVE_FINISHED,
    PLAYLIST_TRACKS_REQUEST,
    PLAYLIST_TRACKS_RECEIVED,
    PLAYLISTS_REQUEST,
    PLAYLISTS_RECIEVED,
    UPDATE_PLAYLIST_NAME
} from './types'
import { accessToken } from './authActions'


// this action uses thunk middleware by returning a function and is needed
// since adding a track changes the playlist (i.e. it needs to be saved)
export function addTrack(track) {
    return (dispatch, getState) => {
        let name = getState().playlistName.playlistName
        dispatch(saveNeeded(name));
        // dispatching an "addTrack action below. return will not work since using thunk
        dispatch({
            type: ADD_TRACK,
            track: track
        });
    }
}

// this action uses thunk middleware by returning a function and is needed 
//since removing a track changes the playlist (i.e. it needs to be saved)
export function removeTrack(track) {
    return (dispatch, getState) => {
        let name = getState().playlistName.playlistName
        dispatch(saveNeeded(name));

        // dispatching a "removeTrack" action below. return will not work since using thunk
        dispatch({
            type: REMOVE_TRACK,
            track: track
        });
    }
}

export function saveNeeded(name) {
    return {
        type: SAVE_NEEDED,
        playlistName: name
    };
}

export function saveFinished(name, id) {
    return {
        type: SAVE_FINISHED,
        playlistName: name,
        playlistID: id
    };
}

// saveToSpotify action.
//  - use thunk middleware to dispatch appropriate actions for logging saved state
//  - use thunk middleware to work enable async actions
export function saveToSpotify(playlistName, trackURIs) {

    return dispatch => {
        let token = accessToken;
        let headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
        let userID = '';
        let playlistID = '';

        if (!playlistName || trackURIs.length === 0 || !trackURIs) { return }

        // get userID
        dispatch(saveNeeded(playlistName));
        fetch('https://api.spotify.com/v1/me', { headers: headers })
            .then(response => response.json())
            .then(jsonResponse => {
                userID = jsonResponse.id;
                // use userID to fetch the user's playlists
                return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, { headers: headers });
            })
            .then(response => response.json())
            .then(jsonResponse => {
                let currentPlaylists = jsonResponse.items.map(playlist => ({ name: playlist.name, id: playlist.id }));
                // if there is a playlist under the same name, update with PUT.
                if (currentPlaylists.map(obj => obj.name).includes(playlistName)) {

                    let playlistID = currentPlaylists.filter(obj => {
                        return obj.name === playlistName
                    })[0].id;

                    //dispatch saveFinished action
                    dispatch(saveFinished(playlistName, playlistID));

                    fetch(
                        `https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`,
                        {
                            method: 'PUT',
                            headers: headers,
                            body: JSON.stringify({
                                uris: trackURIs
                            })
                        }
                    );
                }
                else {
                    // else create new playlist
                    return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`,
                        {
                            method: 'POST',
                            headers: headers,
                            body: JSON.stringify({
                                name: playlistName
                            })
                        }
                    )
                        .then(response => response.json())
                        .then(jsonResponse => {
                            playlistID = jsonResponse.id;

                            // dispatch saveFinished action
                            dispatch(saveFinished(playlistName, playlistID));

                            // use playlistID to add tracks to the newly created playlist
                            return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`,
                                {
                                    method: 'POST',
                                    headers: headers,
                                    body: JSON.stringify({
                                        uris: trackURIs
                                    })
                                }
                            )
                        })
                }
            }
            );
    }

}

// this action does not absolutely need to pass dispatch as an argument, but we need to use thunk middleware to dispatch the
// saveNeeded action - idea being that the playlist name has changed so a save is needed.
export function updatePlaylistName(name) {
    return dispatch => {
        dispatch(saveNeeded(name))
        //dispatching an "updatePlaylistName" action below. return does not work since using thunk
        dispatch({
            type: UPDATE_PLAYLIST_NAME,
            name: name
        })
    }
}

export function playlistsRequest() {
    return {
        type: PLAYLISTS_REQUEST
    }
}

export function playlistsRecieved(jsonResponse) {
    return {
        type: PLAYLISTS_RECIEVED,
        currentPlaylists: jsonResponse.items.map(
            playlist => ({
                name: playlist.name,
                id: playlist.id
            })
        )
    }
}

export function loadPlaylists() {
    return dispatch => {
        dispatch(playlistsRequest())
        let token = accessToken;
        let headers = {
            Authorization: `Bearer ${token}`
        };
        let userID = '';
        return fetch('https://api.spotify.com/v1/me',
            { headers: headers })
            .then(response => response.json())
            .then(jsonResponse => {
                userID = jsonResponse.id
                return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, { headers: headers })
            })
            .then(response => response.json())
            .then(jsonResponse => dispatch(playlistsRecieved(jsonResponse)));
    }
}

export function playlistTracksRequest() {
    return {
        type: PLAYLIST_TRACKS_REQUEST
    };
}

// helper function gor playlistTracksRecieved
function getTracks(jsonResponse) {
    if (jsonResponse.items) {
        return jsonResponse.items.map(
            item => ({
                id: item.track.id,
                name: item.track.name,
                artist: item.track.artists[0].name,
                album: item.track.album.name,
                uri: item.track.uri
            })
        );
    }
}
export function playlistTracksReceived(jsonResponse) {
    return {
        type: PLAYLIST_TRACKS_RECEIVED,
        tracks: getTracks(jsonResponse),
    };
}

export function getPlaylistTracks(playlistID) {
    return dispatch => {
        dispatch(playlistTracksRequest());
        let headers = { Authorization: `Bearer ${accessToken}` };
        let userID = '';

        // make a request to get the userID and use that with the playlistID argument to get the tracks
        return fetch('https://api.spotify.com/v1/me', { headers: headers })
            .then(response => response.json())
            .then(jsonResponse => {
                userID = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, { headers: headers });
            })
            .then(response => response.json())
            .then(jsonResponse => dispatch(playlistTracksReceived(jsonResponse))
            );
    };
}