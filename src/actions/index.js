import Axios from "axios";

export  const GET_WEATHER = "get_weather";
export  const GET_TERM = "get_term";
export  const GET_HOURLY = "get_hourly";

export function weatherSearch(term, callback) {
    const ROOT_URL = `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22${term}%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`;

    const request = Axios.get(ROOT_URL).then(callback());

    return {
        type: GET_WEATHER,
        payload: request
    }
}

export function getLastTerm(term) {
    return {
        type: GET_TERM,
        payload: term
    }
}

export function getHourlyWeather(lat, lon) {
    const API_KEY = "58c0fd890f30516b59c6615c6b956fb8";
    const URL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`

    const request = Axios.get(URL);

    return {
        type: GET_HOURLY,
        payload: request
    }
}
