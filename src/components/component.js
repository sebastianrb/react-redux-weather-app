import React from 'react';
//connect to redux
import { connect } from "react-redux";

import "../styles/component.scss";
import classNames from "classnames";

class TestComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {active: true}

    //set contexts
    this.toggleElement = this.toggleElement.bind(this);
  }

  toggleElement(event) {
    if(this.state.active) {
        this.setState({active: false})
    } else {
        this.setState({active: true})
    }

    console.log(this.state.active);

    //console log redux state
    console.log("Data state: ", this.props.data);
  }

  render() {
    //set up classes
    const testClasses = classNames({
        targetDiv: true,
        active: this.state.active
    });

    return (
      <div>
        <h4>This is a test component</h4>
        <div className={testClasses}>
            <p>This is the target element</p>
        </div>
        <button onClick={this.toggleElement}>Toggle element visibility</button>
      </div>
    );
  }
}

//connect to redux

function mapStateToProps(state) {
    return {
      data: state.data
    }
}

export default connect(mapStateToProps)(TestComponent);

