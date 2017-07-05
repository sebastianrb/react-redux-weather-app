import React from "react";

export default class WeatherDay extends React.Component {
  constructor(props) {
    super(props);

    this.generateConditionCaption = this.generateConditionCaption.bind(this);
  }

  generateConditionCaption() {
    if(this.props.currentTemp) {
      return (
        <span>{this.props.currentTemp}&deg; and {this.props.conditionDescription}</span>
      );
    } else {
      return (
        <span>{this.props.conditionDescription}</span>
      );
    }
  }


  render() {

    if(!this.props.dataPresent) {
        return (
            <li className={"weather-panel__day" + ` ${this.props.classText}`} key={this.props.dayTitle}>
              <h3 className="weather-panel__day-header">{this.props.dayTitle}</h3>
              <div className="weather-panel__day-content">
                <p className="weather-panel__day-placeholder-text">Search for a city to see weather data.</p>
              </div>
            </li>
        );
    } else if(this.props.dataPresent === "noResult") {
      return (
          <li className={"weather-panel__day" + ` ${this.props.classText}`} key={this.props.dayTitle + `-noResult`}>
            <h3 className="weather-panel__day-header">{this.props.dayTitle}</h3>
            <div className="weather-panel__day-content">
              <p className="weather-panel__day-placeholder-text"><span>No data found for "{this.props.lastTerm}"</span></p>
            </div>
          </li>
      );
    } else {
        return (
            <li className={"weather-panel__day" + ` ${this.props.dayName}`} key={`${this.props.dayName}-${this.props.city}`}>
              <h3 className="weather-panel__day-header">{this.props.caption}</h3>
              <img src={require(`../images/${this.props.imageURL}.svg`)} alt="placeholder+image" className="weather-panel__conditions-icon" />
              <h4 className="weather-panel__conditions-caption">{this.generateConditionCaption()}</h4>
              <div className="weather-panel__day-content">
               <p className="weather-panel__day-content-high">
                 <i className="fa fa-thermometer-full" aria-hidden="true"></i>  High of {this.props.high}&deg;
               </p>
               <p className="weather-panel__day-content-low">
                 <i className="fa fa-thermometer-empty" aria-hidden="true"></i>  Low of {this.props.low}&deg;
               </p>
               <p className={"weather-panel__day-content-humidity" + (this.props.dayName === "now" ? "" : " not-displayed")}>
                 <i className="fa fa-tint" aria-hidden="true"></i>  Humidity of {this.props.humidity}%
               </p>
              </div>
            </li>
        );
    }
  }

}

