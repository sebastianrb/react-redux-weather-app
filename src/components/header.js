import React from 'react';
import { Link } from "react-router-dom";

export default class Header extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
        term: "",
        sections: ["weather", "clothing", "about"],
        selectedSection: "weather"
    };
  }

  onNavItemClick(section) {
    this.setState({
      selectedSection: section
    });
  }

  render() {

    const weatherNavClasses = `header__nav-item ${this.state.selectedSection === "weather" ? "selected" : ""}`;
    const clothingNavClasses = `header__nav-item ${this.state.selectedSection === "clothing" ? "selected" : ""}`;
    const aboutNavClasses = `header__nav-item ${this.state.selectedSection === "about" ? "selected" : ""}`;

    //generate list items
    const listItems = this.state.sections.map((section) => {

      const classList = `header__nav-item ${this.state.selectedSection === section ? "selected" : ""}`;
      const image = (section === "weather" ? "sun" : section === "clothing" ? "shirt" : "info");
      const linkTo = (section === "weather" ? "/" : section === "clothing" ? "/clothing" : "/about");

      return (
        <li className={classList} onClick={this.onNavItemClick.bind(this, section)} key={section}>
          <Link to={linkTo} className="header__nav-item-link">
            <img className="header__nav-image" src={require(`../images/${image}.svg`)} alt="placeholder+image" />
            {section}
          </Link>
        </li>
      );
    });

    return (
      <div className="header-container">
        <div className="header">
          <div className="header__title-container">
            <div className="header__image-container">
              <img src={require("../images/cloud.svg")} alt="placeholder+image" className="header__image" /></div>
            <h3 className="header__title">Weather App</h3>
          </div>
          <div className="header__nav-container">
            <ul className="header__nav-list">
              {/*generate this list using an array and map*/}
              {listItems}
            </ul>
          </div>
        </div>
        <div className="header__search-bar">
          <form className="header__search-form">
            <input placeholder="Enter the name of an American city" type="text" className="header__search-field"/>
            <button className="header__submit-button">Find Weather</button>
          </form>
        </div>
      </div>
    );

  }
}
