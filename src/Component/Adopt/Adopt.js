/* eslint-disable jsx-a11y/alt-text */
import React, { Component, Fragment } from "react";
import petDogButton from "../Image/pet-button-dog.jpg";
import petCatButton from "../Image/pet-button-cat.jpg";
import "./Adopt.css";
import MyContext from "../../Context/Context";
import ApiService from "../../Service/ApiService";
import { Link } from "react-router-dom";

class Adopt extends Component {
  static contextType = MyContext;

  handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.userName.value;
    ApiService.getPeople().then((res) => this.context.people(res));
    ApiService.addPerson(name).then((res) => {
      this.context.updatePeople(res);
      this.props.history.push("/");
    });
  };

  render() {
    return (
      <Fragment>
        <div className="adopt">
          <h2>Click on an animal to start!</h2>
          <div className="button">
            <div className="left-button adopt-main">
              <h3>Dogs</h3>
              <Link to="/adopt/dogs">
                <button type="button">
                  <img src={petDogButton} className="button-image" />
                </button>
              </Link>
            </div>
            <div className="right-button adopt-main">
              <h3>Cats</h3>
              <Link to="/adopt/cats">
                <button type="button">
                  <img src={petCatButton} className="button-image" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Adopt;
