import { TEST_TYPE } from "../actions"

export default function(state = [], action) {
    switch(action.type) {
        case TEST_TYPE:
            console.log(action.payload);
            return [action.payload, ...state];
        default:
            return state;
    }
}
