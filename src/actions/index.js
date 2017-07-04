import Axios from "axios";

export  const GET_WEATHER = "get_weather";
export  const GET_TERM = "get_term";

export function weatherSearch(term) {
    const ROOT_URL = `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22${term}%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`;

    const request = Axios.get(ROOT_URL);

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
