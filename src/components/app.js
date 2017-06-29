import React, {Component} from "react";
import ReactDOM from "react-dom";

import "../styles/main.scss";
import Header from "./header";

export default class App extends Component {
    constructor(props) {
        //set props
        super(props);
    }

    //render
    render() {
        return (
            <div>
                <Header />
            </div>
        )
    }
}
