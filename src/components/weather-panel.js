import React from 'react';
import EasyTransition from 'react-easy-transition';
import { Link } from "react-router-dom";
import { transitionSetting } from "../index.js";
import { connect } from "react-redux";
import conditions from "./conditions-object";

let daysListResult;

class WeatherPanel extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      conditions: conditions,
      daysPlaceholder: [
        {
          dayTitle: "Now",
          classText: "now"
        },
        {
          dayTitle: "Tomorrow",
          classText: "tomorrow"
        },
        {
          dayTitle: "The Next Day",
          classText: "next-day"
        }

      ]
    };
  }

  componentWillMount() {
   console.log("Component mounting");
  }

  renderCityHeader() {
    if(Object.keys(this.props.weather).length > 0) {
      return (
        <h3 className="city-name-header">Here's the forecast for {this.props.weather.location.city}, {this.props.weather.location.region}, {this.props.weather.location.country}</h3>
      );
    } else {
      return (
        ""
      );
    }
  }

  render() {
    // generate day list items
    if(Object.keys(this.props.weather).length === 0) {
      console.log("No data");
      //user has not searched for a city; placholder text
      daysListResult = this.state.daysPlaceholder.map((dayObject) => {
        return (
           <li className={"weather-panel__day" + ` ${dayObject.classText}`} key={dayObject.dayTitle}>
             <h3 className="weather-panel__day-header">{dayObject.dayTitle}</h3>
             <div className="weather-panel__day-content">
               <p className="weather-panel__day-placeholder-text">Search for a city to see weather data.</p>
             </div>
           </li>
         );
      });
    } else {
      //user has searched for a city
      daysListResult = this.props.weather.days.map((day) => {
        return (
           <li className={"weather-panel__day" + ` ${day.day}`} key={day.day}>
             <h3 className="weather-panel__day-header">{day.caption}</h3>
             <img src={require(`../images/${this.state.conditions[day.conditionCode].image}.svg`)} alt="placeholder+image" className="weather-panel__conditions-icon" />
             <h4 className="weather-panel__conditions-caption">{this.state.conditions[day.conditionCode].description}</h4>
             <div className="weather-panel__day-content">
              <p className="weather-panel__day-content-high">
                <i className="fa fa-thermometer-full" aria-hidden="true"></i>  High of {day.high}&deg;
              </p>
              <p className="weather-panel__day-content-low">
                <i className="fa fa-thermometer-empty" aria-hidden="true"></i>  Low of {day.low}&deg;
              </p>
              <p className={"weather-panel__day-content-humidity" + (day.day === "now" ? "" : " not-displayed")}>
                <i className="fa fa-tint" aria-hidden="true"></i>  Humidity of {day.humidity}
              </p>
             </div>
           </li>
         );
      });
    }

    return (
      <EasyTransition
          path={location.pathname}
          initialStyle={{opacity: 0, transform: "scale(.9)"}}
          transition={transitionSetting}
          finalStyle={{opacity: 1, transform: "scale(1)"}}
      >
        <div className="weather-panel">
          {this.renderCityHeader()}
          <ul className="weather-panel__day-list">
            {daysListResult}
          </ul>
        </div>
    </EasyTransition>
    );
  }
}


//connect to redux

function mapStateToProps(state) {
    return {
      weather: state.weather
    }
}

export default connect(mapStateToProps)(WeatherPanel);
