import "../styles/main.scss";
import React, {Component} from "react";
import ReactDOM from "react-dom";
import TestComponent from "./component";
import SaveData from "./component_two";

//create a new component. This component should generate HTML
export default class App extends Component {
    constructor(props) {
        //set props
        super(props);
    }

    //render
    render() {
        return (
            <div>
               React and Redux are working! Happy day.
               <TestComponent />
               <SaveData />
            </div>
        )
    }
}
