//default root reducer skeleton
import weatherReducer from "./weather_reducer";
import lastTermReducer from "./last-term_reducer";
import hourlyWeatherReducer from "./hourly_weather_reducer";
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  weather: weatherReducer,
  hourlyWeather: hourlyWeatherReducer,
  lastTerm: lastTermReducer
});

export default rootReducer;
