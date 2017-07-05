import { GET_TERM } from "../actions"

export default function(state = "", action) {
    switch(action.type) {
        case GET_TERM:
            return action.payload
        default:
            return state;
    }
}
