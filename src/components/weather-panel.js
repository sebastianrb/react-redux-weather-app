import React from 'react';
import EasyTransition from 'react-easy-transition';
import { Link } from "react-router-dom";
import { transitionSetting } from "../index.js";
import { connect } from "react-redux";

class WeatherPanel extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      days: [
        {
          dayTitle: "Today",
          classText: "today"
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

  componentDidMount() {
    console.log(this.props.weatherObject);
  }

  render() {
    //generate day list items
    const dayList = this.state.days.map((dayObject) => {
      return (
        <li className={"weather-panel__day" + ` ${dayObject.classText}`} key={dayObject.dayTitle}>
          <h3 className="weather-panel__day-header">{dayObject.dayTitle}</h3>
        </li>
      );
    });

    return (
      <EasyTransition
          path={location.pathname}
          initialStyle={{opacity: 0, transform: "scale(.9)"}}
          transition={transitionSetting}
          finalStyle={{opacity: 1, transform: "scale(1)"}}
      >
        <div className="weather-panel">
          <ul className="weather-panel__day-list">
            {dayList}
          </ul>
        </div>
    </EasyTransition>
    );
  }
}


//connect to redux

function mapStateToProps(state) {
    return {
      weatherObject: state.weather
    }
}

export default connect(mapStateToProps)(WeatherPanel);
