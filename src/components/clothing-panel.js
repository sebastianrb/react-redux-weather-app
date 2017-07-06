import React from 'react';
import HI from "heat-index";
import EasyTransition from 'react-easy-transition';
import { Link } from "react-router-dom";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from "react-redux";
import { transitionSetting } from "../index.js";
import CityHeader from "./city-header";
import conditions from "./conditions-object";

class ClothingPanel extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      day: "",
      searchEntered: false,
      imageURL: "",
      humidity: "",
      currentTemp: "",
      hotOrCold: "",
      conditions: conditions
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
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.weather.count === 0) {
      this.toggleSearchEntered(false);
    } else {
      this.toggleSearchEntered(true);
      //set current day
      this.setDay(nextProps.weather.days[0]);
    }
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
    console.log("Temp: ", temperature);
    if(this.state.day.currentTemp && this.state.day.humidity) {
      return Math.round(HI.heatIndex({temperature: temperature, humidity: humidity, fahrenheit: true}));
    } else {
      return 0;
    }
  }

  // calculateHeatIndex(temperatureInput, humidityInput) {
  //   let temperature = parseInt(temperatureInput);
  //   let humidity = parseInt(humidityInput);
  //   let heatIndex;
  //   if(temperature > 80) {
  //     heatIndex = Math.round(
  //       -42.379 + (2.04901523 * temperature) + (10.14333127 * humidity) + (-0.22475541 * temperature * humidity) + (-.00683783 * temperature * temperature) + (-.05481717 * humidity * humidity) + (.00122874 * temperature * temperature * humidity) + (.00085282 * temperature * humidity * humidity) + (-.00000199 * temperature * temperature * humidity * humidity)
  //       );
  //   } else {
  //     heatIndex = Math.round(.5 * (temperature + 61 + ((temperature - 68) * 1.2) + (humidity * .094)));
  //   }

  //   console.log("Heat index: ", heatIndex);

  //   return (
  //     <span className="heat-index-span">{heatIndex}</span>
  //   );
  // }

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
                  <div className="clothing-panel__weather-overview-temp__icon-container">
                    <img src={require("../images/thermometer-clothing.svg")} alt="placeholder+image" className="clothing-panel__weather-overview-temp__icon" />
                    <p className="clothing-panel__weather-overview-temp__icon-caption">{this.state.day.currentTemp}&deg;</p>
                  </div>
                  <div className="clothing-panel__weather-overview-temp__icon-container">
                    <img src={require("../images/humidity-clothing.svg")} alt="placeholder+image" className="clothing-panel__weather-overview-temp__icon" />
                    <p className="clothing-panel__weather-overview-temp__icon-caption">{this.state.day.humidity}%</p>
                  </div>
                </div>
                <p className="clothing-panel__weather-overview-temp__description">{this.generateTemperatureString(this.state.day.currentTemp, this.state.day.humidity)} The heat index, a metric expressing the level of comfort felt as a result of the combined effects of the temperature and humidity of the air, currently reads {this.getHeatIndex(this.state.day.currentTemp, this.state.day.humidity)} degrees.</p>
              </div>
              <div className="clothing-panel__weather-overview-conditions">
                <div className="clothing-panel__weather-overview-icons">
                  <div className="clothing-panel__weather-overview-temp__icon-container">
                    <img src={(this.state.searchEntered ? require(`../images/${this.state.conditions[this.state.day.conditionCode].image}.svg`)  : require(`../images/partly-cloudy.svg`))} alt="placeholder+image" className="clothing-panel__weather-overview-temp__icon clothing-icon-condition" />
                    <p className="clothing-panel__weather-overview-temp__icon-caption">{this.state.day.conditionDescription}</p>
                  </div>
                </div>
                <p className="clothing-panel__weather-overview-conditions__description">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
              </div>
            </div>
            <div className="clothing-panel__what-to-wear">
              <h3 className="clothing-panel__what-to-wear__header">What to wear?</h3>
              <p className="clothing-panel__what-to-wear__caption">Here are our general clothing recommendations based on analysis of the current weather conditions:</p>
              <ul className="clothing-panel__what-to-wear__clothing-icons">
                <li>Shirt</li>
                <li>Pants</li>
                <li>Shoes</li>
              </ul>
            </div>
            <div className={"clothing-panel__cover" + (this.state.searchEntered ? " cover-hidden"  : "")}>
              <h3 className="clothing-panel__cover-caption">Please search for a city to see recommendations</h3>
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
      weather: state.weather
    }
}

export default connect(mapStateToProps)(ClothingPanel);
