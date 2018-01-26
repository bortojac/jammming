// since none of the selectors below transform the data they select, there is no need for memoization with reselect?

// currentPlaylist state
export const getLoading = (state) => state.loadPlaylists.loading

export const getCurrentPlaylists = (state) => state.loadPlaylists.currentPlaylists

// app state
export const isTokenGranted = (state) => state.token.tokenGranted