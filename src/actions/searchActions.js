import {
    REQUEST_SEARCH,
    RECEIVE_SEARCH
} from './types'
import { accessToken } from './authActions'


export function requestSearch(term) {
    return {
        type: REQUEST_SEARCH,
        term: term
    };
}

export function receiveSearch(jsonResponse) {
    return {
        type: RECEIVE_SEARCH,
        jsonSearchResults: jsonResponse.tracks.items.map(track => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
        })
        )
    };
}

export function fetchSearchResults(term) {
    return dispatch => {
        dispatch(requestSearch(term));
        return fetch(
            `https://api.spotify.com/v1/search?type=track&q=${term}`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        ).then(
            response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('The Request to Spotify API failed');
            },
            networkError => console.log(networkError.message)
            ).then(jsonResponse => dispatch(receiveSearch(jsonResponse)));
    };
}