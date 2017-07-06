import React from "react";

const ClothingConditionIcon = (props) => {
    return (
        <li>
            <p className="clothing-panel__weather-overview-icons-time">{props.timeCaption}</p>
            <div className="clothing-panel__weather-overview-icons-conditions">
              <div className="clothing-panel__weather-overview-temp__icon-container">
                <img src={(props.icon ? require(`../images/${props.icon}.svg`) : require(`../images/not-available.svg`))} alt="placeholder+image" className="clothing-panel__weather-overview-temp__icon clothing-icon-condition" />
                <p className="clothing-panel__weather-overview-temp__icon-caption">{props.weatherCaption}</p>
              </div>
            </div>
        </li>
    );
}

export default ClothingConditionIcon;
