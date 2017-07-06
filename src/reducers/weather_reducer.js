import { GET_WEATHER } from "../actions";

export default function(state = {}, action) {
    switch(action.type) {
        case GET_WEATHER:

            //drill down and get pertinent object
            if(action.payload.data.query.count === 0) {
                return {
                    count: 0
                };
            }

            const returnedData = action.payload.data.query.results.channel;

            const formattedObject = {
                count: action.payload.data.query.count,
                location: {
                    city: returnedData.location.city,
                    region: returnedData.location.region,
                    country: returnedData.location.country
                },
                days: [
                    {
                        day: "now",
                        caption: "Now",
                        currentTemp: returnedData.item.condition.temp,
                        conditionCode: returnedData.item.condition.code,
                        conditionDescription: returnedData.item.condition.text,
                        high: returnedData.item.forecast[0].high,
                        low: returnedData.item.forecast[0].low,
                        humidity: returnedData.atmosphere.humidity
                    },
                    {
                        day: "tomorrow",
                        caption: "Tomorrow",
                        conditionCode: returnedData.item.forecast[1].code,
                        conditionDescripion: returnedData.item.forecast[1].text,
                        high: returnedData.item.forecast[1].high,
                        low: returnedData.item.forecast[1].low
                    },
                    {
                        day: "nextDay",
                        caption: "The Next Day",
                        conditionCode: returnedData.item.forecast[2].code,
                        conditionDescripion: returnedData.item.forecast[2].text,
                        high: returnedData.item.forecast[2].high,
                        low: returnedData.item.forecast[2].low
                    }
                ]
            };

            return formattedObject;

        default:
            return state;
    }
}
