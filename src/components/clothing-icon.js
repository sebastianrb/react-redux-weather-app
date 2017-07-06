import React from "react";

const ClothingIcon = (props) => {
    return (
        <li>
          <div className="clothing-panel__clothing-icon-container">
            <img src={(props.icon ? require(`../images/${props.icon}.svg`) : require(`../images/not-available.svg`))} alt="placeholder+image" className="clothing-panel__clothing-icon-image" />
            <p className="clothing-panel__clothing-icon-caption">{props.weatherCaption}</p>
          </div>
        </li>
    );
}

export default ClothingIcon;
