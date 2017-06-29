//default root reducer skeleton
import weatherReducer from "./weather_reducer";
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  weather: weatherReducer
});

export default rootReducer;
