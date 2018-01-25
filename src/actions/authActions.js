import { AUTH_RECEIVED } from './types'

export let accessToken = '';
let expireTime = '';
const clientID = '889519bd940a428087d936a46da18350';
//const redirectURI = 'http://localhost:3000';
const redirectURI = 'https://jammming.now.sh';
const spotifyURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&redirect_uri=${redirectURI}&scope=playlist-modify-public&response_type=token`;


// #### README ####
// we are using implicit grant flow. See spotify dev docs
// future update: add state to the spotify URL. This is more secure. create a variable that is radomized for each client state that we can use to check the request.
// see https://developer.spotify.com/web-api/authorization-guide/#implicit_grant_flow

export function authReceived() {
    return {
        type: AUTH_RECEIVED
    };
}

export function getAccessToken() {

    return dispatch => {

        if (accessToken) {
            return accessToken;
        }
        //check if there is a token in the url 
        const accessTokenRegX = /access_token=([^&]*)/;  //we use () around [^&]* so that it captures the access token
        const expireTimeRegX = /expires_in=([^&]*)/;
        const urlAccessToken = window.location.href.match(accessTokenRegX);
        const urlExpireTime = window.location.href.match(expireTimeRegX);
        // if there is a token in the url, update the accessToken and expireTime, and set the timeout
        if (urlAccessToken && urlExpireTime) {
            accessToken = urlAccessToken[1]; // accessing the 'captured' value from the match function above, which is the token
            expireTime = urlExpireTime[1];
            window.setTimeout(() => accessToken = '', expireTime * 1000);  // on when the token expires, we need to reset the token. 
            window.history.pushState('Access Token', null, '/'); // need to clear the url so that the app doesn't try to grab the token after it's expired
        }
        else {
            //if there is no accessToken and also no accessToken in the URL, we need to redirect the user to the spotifyURL
            window.location = spotifyURL;
        }
        dispatch(authReceived())

    }

}