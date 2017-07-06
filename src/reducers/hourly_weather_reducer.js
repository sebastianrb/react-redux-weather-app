import { GET_HOURLY } from "../actions";

export default function(state = {}, action) {
    switch(action.type) {
        case GET_HOURLY:
            return {
                "3Hours": action.payload.data.list[1],
                "6Hours": action.payload.data.list[2]
            }
        default:
            return state;
    }
}
