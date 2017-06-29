import { GET_WEATHER } from "../actions";

export default function(state = {}, action) {
    switch(action.type) {
        case GET_WEATHER:
            console.log(action.payload);
            //drill down and get pertinent object
            return action.payload.data.query.results.channel;
        default:
            return state;
    }
}
