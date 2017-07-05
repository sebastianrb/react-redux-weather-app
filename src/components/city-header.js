import React from 'react';

const CityHeader = (props) => {
    if(Object.keys(props.weather).length > 0 && Object.keys(props.weather).length !== 1) {
      return (
        <h3 className="city-name-header">{props.headerText} <span>{props.weather.location.city}, {props.weather.location.region}, {props.weather.location.country}</span></h3>
      );
    } else {
      return (
        null
      );
    }
}

export default CityHeader;
