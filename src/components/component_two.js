import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { testAction } from "../actions/index.js"
import "../styles/component_two.scss";


class SaveData extends React.Component {
    constructor(props) {
        super(props)

        this.state = {term: ""};

        // this.handleInputChange = this.handleInputChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        this.setState({
            term: event.target.value
        });
    }

    handleInputSubmit(event) {
        event.preventDefault();

        //call action creator
        this.props.testAction(this.state.term);

        //reset component state
        this.setState({term: ""});
    }

    render() {
        return (
            <div>
                <form
                    onSubmit={this.handleInputSubmit.bind(this)}>
                    <input
                        type="text"
                        className="input-field"
                        value={this.state.term}
                        onChange={this.handleInputChange.bind(this)}
                    />
                    <button type="submit" className="submit-button">Save Data to Redux Store</button>
                </form>
            </div>
        );
    }
}


//connect to redux

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ testAction: testAction }, dispatch);
}

//connect function

export default connect(null, mapDispatchToProps)(SaveData);
