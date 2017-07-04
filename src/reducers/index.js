//default root reducer skeleton
import weatherReducer from "./weather_reducer";
import lastTermReducer from "./last-term_reducer";
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  weather: weatherReducer,
  lastTerm: lastTermReducer
});

export default rootReducer;
