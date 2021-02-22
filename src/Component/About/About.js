/* eslint-disable jsx-a11y/alt-text */
import React, { Component, Fragment } from "react";
import petAbout from "../Image/pet-about.jpg";
import "./About.css";

class About extends Component {
  render() {
    return (
      <Fragment>
        <div className="about">
          <div className="about-left">
            <img src={petAbout} />
          </div>
          <div className="about-right">
            <div className="about-description">
              <h2>Adopt a Pet Today!</h2>
              <p>
                Dogs and cats are waiting for you. Get ready for a new family!
              </p>
            </div>
            <br />
            <div className="about-howto">
              <h2>How To Use The Site!</h2>
              <p>
                This is where dogs and cats are adopted. Adoption here is first
                in, first out. Adoption is possible after the early adopter is
                over.{" "}
              </p>
              <p>
                {" "}
                Go to the adoption page, click the picture of the animal you
                want, and enter your name to prepare for adoption!
              </p>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default About;
