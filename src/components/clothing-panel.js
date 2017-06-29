import React from 'react';
import EasyTransition from 'react-easy-transition';
import { Link } from "react-router-dom";

import { transitionSetting } from "../index.js";

export default class CothingPanel extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <EasyTransition
          path={location.pathname}
          initialStyle={{opacity: 0, transform: "scale(.9)"}}
          transition={transitionSetting}
          finalStyle={{opacity: 1, transform: "scale(1)"}}
      >
        <div>Clothing Panel</div>
    </EasyTransition>
    );
  }
}
