//default root reducer skeleton
import TestReducer from "./test_reducer";
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  data: TestReducer
});

export default rootReducer;
