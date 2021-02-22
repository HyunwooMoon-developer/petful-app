/* eslint-disable jsx-a11y/alt-text */
import React, { Component, Fragment } from "react";
import mainPetful from "../Image/petful-main.jpg";
import "./Main.css";

class Main extends Component {
  render() {
    return (
      <Fragment>
        <img src={mainPetful} className="main-image" />
      </Fragment>
    );
  }
}

export default Main;
