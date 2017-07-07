const conditions = {
  "0": {
        description: "tornado",
        image: "windy"
      },
  "1": {
        description: "tropical storm",
        image: "rain"
      },
  "2": {
        description: "hurricane",
        image: "windy"
      },
  "3": {
        description: "severe thunderstorms",
        image: "thunder"
      },
  "4": {
        description: "thunderstorms",
        image: "thunder",
        openWeatherMapCodes: ["11d", "11n"]
      },
  "5": {
        description: "mixed rain and snow",
        image: "snow"
      },
  "6": {
        description: "mixed rain and sleet",
        image: "wintry"
      },
  "7": {
        description: "mixed snow and sleet",
        image: "wintry"
      },
  "8": {
        description: "freezing drizzle",
        image: "wintry"
      },
  "9": {
        description: "drizzle",
        image: "rain"
      },
  "10": {
        description: "freezing rain",
        image: "rain"
      },
  "11": {
        description: "showers",
        image: "rain",
        openWeatherMapCodes: ["09d", "09d", "10d", "10n"]
      },
  "12": {
        description: "showers",
        image: "rain"
      },
  "13": {
        description: "snow flurries",
        image: "snow"
      },
  "14": {
        description: "light snow showers",
        image: "snow"
      },
  "15": {
        description: "blowing snow",
        image: "snow"
      },
  "16": {
        description: "snow",
        image: "snow",
        openWeatherMapCodes: ["13d", "13n"]
      },
  "17": {
        description: "hail",
        image: "wintry"
      },
  "18": {
        description: "sleet",
        image: "wintry"
      },
  "19": {
        description: "dust",
        image: "windy"
      },
  "20": {
        description: "foggy",
        image: "foggy",
        openWeatherMapCodes: ["50d", "50n"]
      },
  "21": {
        description: "haze",
        image: "foggy"
      },
  "22": {
        description: "smoky",
        image: "foggy"
      },
  "23": {
        description: "blustery",
        image: "windy"
      },
  "24": {
        description: "windy",
        image: "windy"
      },
  "25": {
        description: "cold",
        image: "low-temp"
      },
  "26": {
        description: "cloudy",
        image: "cloudy",
        openWeatherMapCodes: ["04d", "04n"]
      },
  "27": {
        description: "mostly cloudy",
        image: "cloudy-night",
        openWeatherMapCodes: ["02n", "03n"]
      },
  "28": {
        description: "mostly cloudy",
        image: "partly-cloudy"
      },
  "29": {
        description: "partly cloudy",
        image: "cloudy-night"
      },
  "30": {
        description: "partly cloudy",
        image: "partly-cloudy",
        openWeatherMapCodes: ["02d", "03d"]
      },
  "31": {
        description: "clear",
        image: "clear-night",
        openWeatherMapCodes: ["01n"]
      },
  "32": {
        description: "sunny",
        image: "sunny",
        openWeatherMapCodes: ["01d"]
      },
  "33": {
        description: "fair",
        image: "clear-night"
      },
  "34": {
        description: "fair",
        image: "sunny"
      },
  "35": {
        description: "mixed rain and hail",
        image: "wintry"
      },
  "36": {
        description: "hot",
        image: "high-temp"
      },
  "37": {
        description: "isolated thunderstorms",
        image: "thunder"
      },
  "38": {
        description: "scattered thunderstorms",
        image: "thunder"
      },
  "39": {
        description: "scattered thunderstorms",
        image: "thunder"
      },
  "40": {
        description: "scattered showers",
        image: "thunder"
      },
  "41": {
        description: "heavy snow",
        image: "snow"
      },
  "42": {
        description: "scattered snow showers",
        image: "snow"
      },
  "43": {
        description: "heavy snow",
        image: "snow"
      },
  "44": {
        description: "partly cloudy",
        image: "partly-cloudy"
      },
  "45": {
        description: "thundershowers",
        image: "thunder"
      },
  "46": {
        description: "snow showers",
        image: "snow"
      },
  "47": {
        description: "isolated thundershowers",
        image: "thunder"
      },
  "3200": {
        description: "not available",
        image: "not-available",
        openWeatherMapCodes: [""]
      }
};

export default conditions;



//preload images

let images = ["clear-night", "cloudy", "foggy", "high-temp", "low-temp", "partly-cloudy", "rain", "snow", "sunny", "thunder", "windy", "wintry"];

var imageObject = {};

for (var i = 0; i < images.length; i++) {
  imageObject[images[i]] = new Image();
  imageObject[images[i]].src = `../images/${images[i]}.svg`;
}
