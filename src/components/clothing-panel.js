import React from 'react';
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
      high: "",
      low: "",
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
                  <img src={require("../images/thermometer-clothing.svg")} alt="placeholder+image" className="clothing-panel__weather-overview-temp__icon" />
                  <img src={require("../images/humidity-clothing.svg")} alt="placeholder+image" className="clothing-panel__weather-overview-temp__icon" />
                </div>
                <p className="clothing-panel__weather-overview-temp__description">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
              </div>
              <div className="clothing-panel__weather-overview-conditions">
                <div className="clothing-panel__weather-overview-icons">
                  <img src={(this.state.searchEntered ? require(`../images/${this.state.conditions[this.state.day.conditionCode].image}.svg`)  : require(`../images/partly-cloudy.svg`))} alt="placeholder+image" className="clothing-panel__weather-overview-temp__icon clothing-icon-condition" />
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
