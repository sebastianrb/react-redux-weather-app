import React from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { weatherSearch } from "../actions/";
import { getLastTerm } from "../actions/";
import { getHourlyWeather } from "../actions/";

class Header extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
        searchInProgress: false,
        test: "oldValue",
        term: "",
        inputValid: true,
        nothingFound: false,
        sections: ["weather", "clothing", "about"],
        // selectedSection: "weather"
        selectedSection: (window.location.pathname === "/" ? "weather" : window.location.pathname.split("/")[1])
    };
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.weather.count === 0) {
      this.toggleNothingFound(true);
      this.setState({
        searchInProgress: false
      });
    } else {
      this.toggleNothingFound(false);
    }
  }

  toggleNothingFound(found) {
    //set data on state/template
    this.setState({
      nothingFound: found
    });
  }

  onNavItemClick(section) {
    this.setState({
      selectedSection: section
    });
  }

  onInputSubmit(event) {
    event.preventDefault();
    // //execute action creator with search term
    const searchTerm = this.state.term;
    this.setState({
      searchInProgress: true
    });
    if(searchTerm && searchTerm.length > 2) {
      this.props.getLastTerm(searchTerm);
      this.props.weatherSearch(searchTerm, () => {
        console.log("Callback activated");
        setTimeout(() => {
          this.setState({
            searchInProgress: false
          });
          console.log("Async timing test: ", this.props.weather);
          //open weather map callback here?
          this.props.getHourlyWeather(this.props.weather.location.lat, this.props.weather.location.lon);
        }, 900);
      });
      this.setState({
        term: "",
        inputValid: true,
      })
    } else {
      this.setState({
        inputValid: false,
        searchInProgress: false
      })
    }
  }

  onInputChange(event) {
    this.setState({
      term: event.target.value,
      inputValid: true,
      nothingFound: false
    });
  }

  render() {

    const weatherNavClasses = `header__nav-item ${this.state.selectedSection === "weather" ? "selected" : ""}`;
    const clothingNavClasses = `header__nav-item ${this.state.selectedSection === "clothing" ? "selected" : ""}`;
    const aboutNavClasses = `header__nav-item ${this.state.selectedSection === "about" ? "selected" : ""}`;

    //generate list items using map
    const listItems = this.state.sections.map((section) => {

      const classList = `header__nav-item ${this.state.selectedSection === section ? "selected" : ""}`;
      const linkTo = (section === "weather" ? "/" : section === "clothing" ? "/clothing" : "/about");

      return (
        <li className={classList} onClick={this.onNavItemClick.bind(this, section)} key={section}>
          <Link to={linkTo} className="header__nav-item-link">
            <img className="header__nav-image" src={require(`../images/${section}.svg`)} alt="placeholder+image" />
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
            <input
              value={this.state.term}
              placeholder="Enter the name of a city"
              type="text"
              className={"header__search-field" + (this.state.inputValid ? "" : " invalid-term") + (this.state.nothingFound ? " nothing-found" : "")}
              onChange={this.onInputChange.bind(this)}
              onFocus={() => this.setState({inputValid: true, nothingFound: false})}
            />
            <div className="invalid-term-warning">
              <p className="invalid-term-warning__Caption">Your search term must be at least three characters long</p>
            </div>
            <div className="invalid-term-no-results">
              <p className="invalid-term-warning__Caption">No results found. Please try again</p>
            </div>
            <button
              className={"header__submit-button" + (this.state.searchInProgress ? " loading" : "")}
              onClick={this.onInputSubmit.bind(this)}
              >
              Find Weather
            </button>
          </form>
        </div>
      </div>
    );

  }
}


//connect to redux

function mapStateToProps(state) {
    return {
      weather: state.weather
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      weatherSearch: weatherSearch,
      getLastTerm: getLastTerm,
      getHourlyWeather: getHourlyWeather
    }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Header);

