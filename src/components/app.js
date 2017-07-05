import React, {Component} from "react";
import ReactDOM from "react-dom";
import { Route, Switch } from "react-router-dom";

import "../styles/main.scss";
import Header from "./header";
import Footer from "./footer";
import WeatherPanel from "./weather-panel";
import ClothingPanel from "./clothing-panel";
import AboutPanel from "./about-panel";

export default class App extends Component {
    constructor(props) {
        //set props
        super(props);
    }

    componentDidMount() {
        console.log("Location object: ", window.location);
        console.log("Origin: ", window.location.origin);
    }

    //render
    render() {
        return (
            <div>
                <Header />

                <div className="app-content">
                    <Switch>
                        <Route path="/clothing" component={ClothingPanel}></Route>
                        <Route path="/about" component={AboutPanel}></Route>
                        <Route path="/" component={WeatherPanel}></Route>
                    </Switch>

                </div>

                <Footer />
            </div>
        )
    }
}
