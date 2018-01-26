import {
    AUTH_RECEIVED
} from '../actions/types';

export const token = (
    state = {
        tokenGranted: false
    },
    action
) => {
    switch (action.type) {
        case AUTH_RECEIVED:
            return Object.assign({}, state, {
                tokenGranted: true
            })
        default:
            return state
    }
}




