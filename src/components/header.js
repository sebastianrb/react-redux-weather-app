import React from 'react';

export default class Header extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
        term: ""
    };
  }

  render() {
    return (
      <div>This is the header</div>
    );
  }
}
