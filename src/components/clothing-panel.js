import React from 'react';
import EasyTransition from 'react-easy-transition';
import { Link } from "react-router-dom";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from "react-redux";
import { transitionSetting } from "../index.js";

export default class CothingPanel extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};
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
          <h2 className="clothing-panel__main-heading">What to Wear Today</h2>
          <div className="clothing-panel__weather-overview">
            <h3 className="clothing-panel__weather-overview-header">What's it like out?</h3>
            <div className="clothing-panel__weather-overview-temp">
              <img src={require("../")} alt="placeholder+image" className="clothing-panel__weather-overview-temp__icon" />
              <p className="clothing-panel__weather-overview-temp__description">Temp and humidity description caption</p>
            </div>
            <div className="clothing-panel__weather-overview-conditions">
              <img src={require("../")} alt="placeholder+image" className="clothing-panel__weather-overview-conditions__icon" />
              <p className="clothing-panel__weather-overview-conditions__description">Conditions description caption</p>
            </div>
          </div>
          <div className="clothing-panel__what-to-wear">
            <h3 className="clothing-panel__what-to-wear__header">What ot wear?</h3>
            <p className="clothing-panel__what-to-wear__caption">What to wear intro caption</p>
            <ul className="clothing-panel__what-to-wear__clothing-icons">
              <li>Shirt</li>
              <li>Pants</li>
              <li>Shoes</li>
            </ul>
          </div>
        </div>
    </EasyTransition>
    );
  }
}
