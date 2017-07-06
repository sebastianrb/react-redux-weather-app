import React from "react";
import EasyTransition from 'react-easy-transition';
import { Link } from "react-router-dom";
import { transitionSetting } from "../index.js";


const AboutPanel = (props) => {
    return (
        <EasyTransition
            path={location.pathname}
            initialStyle={{opacity: 0, transform: "scale(.9)"}}
            transition={transitionSetting}
            finalStyle={{opacity: 1, transform: "scale(1)"}}
        >
            <div className="about-panel">
                <h2 className="about-panel__main-heading">About the Weather App</h2>
                <p className="about-panel__description">This weather application utilizes the React.js UI framework in conjunction with the Redux state container. The application connects to the Yahoo Weather API and Open Weather Map API to collect weather data and saves that information to a back-end Redux data store. The various components are then built out dynamically based on the city and various weather characteristics such as temperature and conditions.</p>
                <p className="about-panel__description">This is a single page application; the sectional partitioning of the site is implemented using React Routing.</p>
            </div>
        </EasyTransition>
    );
}

export default AboutPanel;
