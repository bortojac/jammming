import {
  REQUEST_SEARCH,
  RECEIVE_SEARCH
} from '../actions/types';


export function searchResults(
  state = {
    tracks: [],
    isFetching: false
  },
  action
) {
  switch (action.type) {
    case REQUEST_SEARCH:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_SEARCH:
      return Object.assign({}, state, {
        isFetching: false,
        tracks: action.jsonSearchResults
      });
    default:
      return state;
  }
}
