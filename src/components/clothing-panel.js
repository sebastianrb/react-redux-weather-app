import React from 'react';
import HI from "heat-index";
import EasyTransition from 'react-easy-transition';
import { Link } from "react-router-dom";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from "react-redux";
import { transitionSetting } from "../index.js";
import CityHeader from "./city-header";
import ClothingConditionIcon from "./clothing-conditions-icon";
import ClothingIcon from "./clothing-icon";
import conditions from "./conditions-object";
import clothing from "./clothing-object";

class ClothingPanel extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      day: "",
      hourlyWeather: "",
      conditionTimes: ["Now", "In Three Hours", "In Six Hours"],
      searchEntered: false,
      imageURL: "",
      humidity: "",
      currentTemp: "",
      hotOrCold: "",
      rainStormCodes: ["1", "2" ,"3", "4", "5", "6" ,"8", "9", "10", "11", "12", "17", "18", "35" ,"37", "38", "39", "40", "45", "47"],
      snowStormCodes: ["5", "7", "8", "13", "14", "15", "16", "41", "42", "43", "46"],
      weatherKeywords: [],
      conditions: conditions,
      clothingObject: clothing,
      clothingItems: ["short-sleeved-shirt", "umbrella", "mittens", "winter-hat" ,"boots", "shorts", "tank-top", "jeans", "long-sleeved-shirt", "jacket", "sunglasses", "shoe1", "flip-flops", "dress"]
    };
  }

  componentDidMount() {
    if(this.props.weather.count === 0 || !this.props.weather.count) {
      console.log("Component mounted");
      this.toggleSearchEntered(false);
    } else {
      this.toggleSearchEntered(true);
      //set current day
      this.setDay(this.props.weather.days[0]);
      this.setHourlyWeather(this.props.hourlyWeather);
      this.generateWeatherKeywords(this.props.weather);
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.weather.count === 0) {
      this.toggleSearchEntered(false);
    } else {
      this.toggleSearchEntered(true);
      //set current day
      this.setDay(nextProps.weather.days[0]);
      this.setHourlyWeather(this.props.hourlyWeather);
      this.generateWeatherKeywords(nextProps.weather);
    }
  }

  generateWeatherKeywords(weather) {
    let weatherKeywords = [];

    //temp
    if(weather.days[0].currentTemp > 85) {
      weatherKeywords.push("hot");
    } else if(weather.days[0].currentTemp > 72) {
      weatherKeywords.push("warm");
    } else if(weather.days[0].currentTemp > 55) {
      weatherKeywords.push("fair");
    } else if(weather.days[0].currentTemp > 42) {
      weatherKeywords.push("cold");
    } else {
      weatherKeywords.push("very cold");
    }

    //conditions
    if(this.state.rainStormCodes.indexOf(weather.days[0].conditionCode) !== -1) {
      weatherKeywords.push("rain");
    } else if(this.state.snowStormCodes.indexOf(weather.days[0].conditionCode) !== -1) {
      weatherKeywords.push("snow");
    } else {
      weatherKeywords.push("dry");
    }

    this.setState({
      weatherKeywords: weatherKeywords
    });
  }

  //refresh state
  toggleSearchEntered(found) {
    //set data on state/template
    this.setState({
      searchEntered: found
    });
  }

  setDay(day) {
    this.setState({
      day: day
    });
  }

  setHourlyWeather(data) {
    this.setState({
      hourlyWeather: data
    });
  }


  resolveIcons(time) {
    if(Object.keys(this.props.hourlyWeather).length > 0 && this.state.day !== "") {
      let iconCode;
      if(time === "Now") {
        return this.state.conditions[this.state.day.conditionCode].image;
      } else if(time === "In Three Hours") {
        iconCode = this.props.hourlyWeather["3Hours"].weather[0].icon;
        for(var code in this.state.conditions) {
            let thisObject = this.state.conditions[code];
            if(thisObject.hasOwnProperty("openWeatherMapCodes")) {
              if(thisObject.openWeatherMapCodes.indexOf(iconCode) !== -1) {
                return thisObject.image;
              }
            }
        }
      } else {
        iconCode = this.props.hourlyWeather["6Hours"].weather[0].icon;
        for(var code in this.state.conditions) {
          let thisObject = this.state.conditions[code];
          if(thisObject.hasOwnProperty("openWeatherMapCodes")) {
            if(thisObject.openWeatherMapCodes.indexOf(iconCode) !== -1) {
              return thisObject.image;
            }
          }
        }
      }
    } else {
      return null;
    }
  }

  resolveConditionCaption(time) {
    if(Object.keys(this.props.hourlyWeather).length > 0) {
      if(time === "Now") {
        return this.state.day.conditionDescription;
      } else if(time === "In Three Hours") {
        return this.props.hourlyWeather["3Hours"].weather[0].description;
      } else {
        return this.props.hourlyWeather["6Hours"].weather[0].description;
      }
    }
  }



//generate text
  generateTemperatureString(temperatureInput, humidityInput) {
    let temperature = parseInt(temperatureInput);
    let humidity = parseInt(humidityInput);
    let resultString = "";


    //get temperature adjective
    if(temperature > 80) {
      resultString += `It's hot and `;
    } else if(temperature > 70) {
      resultString += `It's warm and `;
    } else if(temperature > 50) {
      resultString += `It's cool and `;
    } else {
      resultString += `It's cold and `;
    }

    //get humidity adjective
    if(humidity > 80) {
      resultString += `very humid`;
    } else if(humidity > 60) {
      resultString += `humid`;
    } else if(humidity > 40) {
      resultString += `moderately humid`;
    } else if(humidity > 30) {
      resultString += `fairly dry`;
    } else {
      resultString += `dry`;
    }


    resultString += ` outside.`

    return (
      <span>{resultString}</span>
    );
  }

  getHeatIndex(tempInput, humidityInput) {
    let temperature = parseInt(tempInput);
    let humidity = parseInt(humidityInput);
    if(this.state.day.currentTemp && this.state.day.humidity) {
      return Math.round(HI.heatIndex({temperature: temperature, humidity: humidity, fahrenheit: true}));
    } else {
      return 0;
    }
  }

  renderConditionsList() {
    if(this.props.weather.count === 0 || Object.keys(this.props.weather).length === 0) {
      return null;
    } else {
      if(Object.keys(this.props.hourlyWeather).length > 0) {
        return this.state.conditionTimes.map((time) => {
          return (
            <ClothingConditionIcon
              key={time}
              timeCaption={time}
              hourlyWeather={this.props.hourlyWeather}
              weatherCaption={this.resolveConditionCaption(time)}
              icon={this.resolveIcons(time)}
            />
          );
        });
      }
    }
  }



  renderClothingList() {
    if(this.props.weather.count === 0 || Object.keys(this.props.weather).length === 0) {
      return null;
    } else {
      return this.state.clothingItems.map((clothingItem) => {
        return (
          <ClothingIcon
            key={clothingItem}
            name={clothingItem}
            clothingObject={this.state.clothingObject}
            clothingItems={this.state.clothingItems}
            weatherKeywords={this.state.weatherKeywords}
          />
        );
      });
    }
  }



  render() {

    return (
      <EasyTransition
          path={location.pathname}
          initialStyle={{opacity: 0, transform: "scale(.9)"}}
          transition={transitionSetting}
          finalStyle={{opacity: 1, transform: "scale(1)"}}
      >
        <div className="clothing-panel">
          {/*<h2 className="clothing-panel__main-heading">What to Wear Today</h2>*/}
          <CityHeader
              weather={this.props.weather}
              headerText="Here's what to wear today in"
              panelName="Clothing"
          />
          <div className={"clothing-panel__content-container"}>
            <div className="clothing-panel__weather-overview">
              <h3 className="clothing-panel__weather-overview-header">What's it like out right now?</h3>
              <div className="clothing-panel__weather-overview-temp">
                <div className="clothing-panel__weather-overview-icons">
                  <div className="clothing-panel__weather-overview-temp__icon-container special-temp">
                    <img src={require("../images/thermometer-clothing.svg")} alt="placeholder+image" className="clothing-panel__weather-overview-temp__icon" />
                    <p className="clothing-panel__weather-overview-temp__icon-caption">{this.state.day.currentTemp}&deg;</p>
                  </div>
                  <div className="clothing-panel__weather-overview-temp__icon-container special-temp">
                    <img src={require("../images/humidity-clothing.svg")} alt="placeholder+image" className="clothing-panel__weather-overview-temp__icon" />
                    <p className="clothing-panel__weather-overview-temp__icon-caption">{this.state.day.humidity}%</p>
                  </div>
                </div>
                <p className="clothing-panel__weather-overview-temp__description">{this.generateTemperatureString(this.state.day.currentTemp, this.state.day.humidity)} The heat index, a metric representing the level of comfort felt as a result of temperature and humidity, currently reads {this.getHeatIndex(this.state.day.currentTemp, this.state.day.humidity)} degrees.</p>
              </div>
              <div className="clothing-panel__weather-overview-conditions">
                <ul className="clothing-panel__weather-overview-conditions-list">
                    {this.renderConditionsList()}
                </ul>
              </div>
            </div>
            <div className="clothing-panel__what-to-wear">
              <h3 className="clothing-panel__what-to-wear__header">What to wear?</h3>
              <p className="clothing-panel__what-to-wear__caption">Here are our general clothing recommendations based on analysis of the current weather conditions:</p>
              <ul className="clothing-panel__what-to-wear__clothing-icons">
                  {this.renderClothingList()}
              </ul>
            </div>
            <div className={"clothing-panel__cover" + (this.state.searchEntered ? " cover-hidden"  : "")}>
              <h3 className="clothing-panel__cover-caption">Search for a city to see recommendations</h3>
            </div>
          </div>
        </div>
    </EasyTransition>
    );
  }
}


//connect to Redux

function mapStateToProps(state) {
    return {
      weather: state.weather,
      hourlyWeather: state.hourlyWeather
    }
}


export default connect(mapStateToProps)(ClothingPanel);
