/* eslint-disable jsx-a11y/alt-text */
import React, { Component, Fragment } from "react";
import myFerret from "../Image/my-ferret.jpg";
import { SocialIcon } from "react-social-icons";
import "./Contact.css";

class Contact extends Component {
  render() {
    return (
      <Fragment>
        <div className="contact">
          <img src={myFerret} />
          <h2>Contact me</h2>
          <p>
            If you are interested in this site or have any questions, please
            click the icon below!!
          </p>
          <SocialIcon url="mailto:mhw9163@gmail.com" />{" "}
          <SocialIcon
            url="http://www.linkedin.com/in/hyunwoomoon/"
            target="_blank"
          />{" "}
          <SocialIcon
            url="http://github.com/HyunwooMoon-developer"
            target="_blank"
          />
        </div>
      </Fragment>
    );
  }
}

export default Contact;
