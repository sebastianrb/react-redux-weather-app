import React from 'react';
import EasyTransition from 'react-easy-transition';
import { Link } from "react-router-dom";
import { transitionSetting } from "../index.js";
import { connect } from "react-redux";
import conditions from "./conditions-object";
import WeatherDay from "./weather-day";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import CityHeader from "./city-header";

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


  renderDayList() {
     if(this.props.weather.count === 0) {
      return daysListResult = this.state.daysPlaceholder.map((dayObject) => {
        return (
            <WeatherDay
                dataPresent="noResult"
                classTest={dayObject.classText}
                dayTitle={dayObject.dayTitle}
                key={`${dayObject.dayTitle}`}
                lastTerm={this.props.lastTerm}
            />
         );
      });
    } else if(Object.keys(this.props.weather).length === 0) {
      //default on page load
      return daysListResult = this.state.daysPlaceholder.map((dayObject) => {
        return (
            <WeatherDay
                dataPresent={false}
                classTest={dayObject.classText}
                dayTitle={dayObject.dayTitle}
                key={`${dayObject.dayTitle}`}
            />
         );
      });
    } else {
      //return days with data flowing through
      return daysListResult = this.props.weather.days.map((day) => {
        return (
            <WeatherDay
                dataPresent={true}
                dayName={day.day}
                city={this.props.weather.location.city}
                caption={day.caption}
                imageURL={this.state.conditions[day.conditionCode].image}
                conditionDescription={this.state.conditions[day.conditionCode].description}
                high={day.high}
                low={day.low}
                humidity={(day.humidity ? day.humidity : "")}
                key={`${day.day}-${this.props.weather.location.city}`}
            />
        );
      });
    }
  }

  renderCityHeader() {
    if(Object.keys(this.props.weather).length > 0 && Object.keys(this.props.weather).length !== 1) {
      return (
        <h3 className="city-name-header">Here's the forecast for <span>{this.props.weather.location.city}, {this.props.weather.location.region}, {this.props.weather.location.country}</span></h3>
      );
    } else {
      return (
        ""
      );
    }
  }

  render() {

    const transitionOptions = {
        transitionName: "fade",
        transitionEnterTimeout: 100,
        transitionLeaveTimeout: 0
    };

    return (
      <EasyTransition
          path={location.pathname}
          initialStyle={{opacity: 0, transform: "scale(.9)"}}
          transition={transitionSetting}
          finalStyle={{opacity: 1, transform: "scale(1)"}}
      >
        <div className="weather-panel">
{/*          {this.renderCityHeader()}*/}
          <CityHeader
              weather={this.props.weather}
              headerText="Here's the forecast for"
          />
          <ul className="weather-panel__day-list">
            <ReactCSSTransitionGroup {...transitionOptions}>
                {this.renderDayList()}
            </ReactCSSTransitionGroup>
          </ul>
        </div>
    </EasyTransition>
    );
  }
}


//connect to redux

function mapStateToProps(state) {
    return {
      weather: state.weather,
      lastTerm: state.lastTerm
    }
}

export default connect(mapStateToProps)(WeatherPanel);
