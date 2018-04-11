// since none of the selectors below transform the data they select, there is no need for memoization with reselect?

// playlist selectors
export const getPlaylistsLoadingFlag = (state) => state.loadPlaylists.loading
export const getCurrentPlaylists = (state) => state.loadPlaylists.currentPlaylists
export const getTracksLoadingFlag= (state) => state.playlistTracks.tracksLoading
export const getPlaylistTracks = (state) => state.playlistTracks.tracks
export const getPlaylistName = (state) => state.playlistName.name
export const getSavePlaylistFlag= (state) => state.savePlaylist.saved

// search selectors

export const getFetchingFlag = (state) => state.searchResults.isFetching
export const getSearchResults = (state) => state.searchResults.tracks


// app state
export const isTokenGranted = (state) => state.token.tokenGranted