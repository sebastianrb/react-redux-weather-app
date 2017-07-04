import { GET_TERM } from "../actions"

export default function(state = "", action) {
    switch(action.type) {
        case GET_TERM:
            console.log("Last term: ", action.payload);
            return action.payload
        default:
            return state;
    }
}
