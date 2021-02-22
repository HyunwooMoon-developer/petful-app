/* eslint-disable no-loop-func */
/* eslint-disable no-native-reassign */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component, Fragment } from "react";
import MyContext from "../../Context/Context";
import ApiService from "../../Service/ApiService";
import "./AdoptDogs.css";

class AdoptDogs extends Component {
  state = {
    page: 0,
    name: "",
    turn: false,
    adopted: false,
    typed: false,
  };
  static contextType = MyContext;

  updateName = (e) => {
    e.preventDefault();
    this.setState({
      name: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      typed: true,
    });
    const userName = { name: this.state.name };

    ApiService.addPerson(userName).then(this.context.updateDogPeople(userName));

    this.addUser();
    this.deleteDog();
  };

  changePage = (page) => {
    const pages = this.state.page;
    if (!page && pages === 0) {
      return;
    }
    this.setState({
      page: pages + page,
    });
  };

  adoptDog = () => {
    ApiService.deleteDog()
      .then((dogs) => {
        this.context.updateDogs(dogs);
      })
      .then(() => {
        ApiService.deletePerson().then((people) => {
          this.context.updateDogPeople(people);
        });
      })
      .then(
        this.setState({
          turn: false,
          adopted: true,
        })
      );
  };
  deleteDog = () => {
    this.interval = setInterval(() => {
      ApiService.deleteDog().then((dogs) => {
        this.context.updateDogs(dogs);
      });
      ApiService.deletePerson().then((people) => {
        this.context.updateDogPeople(people);
        if (people[0].name === this.state.name) {
          this.setState({
            turn: true,
          });
          clearInterval(this.interval);
        }
      });
    }, 3000);
  };

  addUser = () => {
    const users = [
      { name: "Alice" },
      { name: "Bill" },
      { name: "Carson" },
      { name: "Downey" },
      { name: "Gill" },
    ];

    let i = 0;
    this.interval = setInterval(() => {
      ApiService.addPerson(users[i]).then(i++);
    }, 3000);
  };

  render() {
    const { dogs = [], dogPeople = [] } = this.context;

    const peopleList = dogPeople.map((person, key) => (
      <li key={key}>{person.name}</li>
    ));
    const page = this.state.page;
    const dog = dogs[page] || {};
    return (
      <Fragment>
        <div className="adopt-dog">
          <div className="dog-info">
            <div>
              <img src={dog.imageURL} alt={dog.description} />
              <br />
              {page < 1 ? (
                ""
              ) : (
                <button
                  onClick={() => this.changePage(-1)}
                  className="adopt-button"
                >
                  Prev
                </button>
              )}{" "}
              {page === dogs.length - 1 ? (
                ""
              ) : (
                <button
                  onClick={() => this.changePage(1)}
                  className="adopt-button"
                >
                  Next
                </button>
              )}
              <br />
              <h2>name : {dog.name}</h2>
              <h4>breed : {dog.breed}</h4>
              <h4>gender : {dog.gender}</h4>
              <h4>age : {dog.age}</h4>
              <h4>story : {dog.story}</h4>
            </div>
          </div>
          <div className="people-info">
            {this.state.typed === false ? (
              <form onSubmit={this.handleSubmit} className="people-form">
                <label htmlFor="userName">
                  <h3>Put your name</h3>
                </label>
                <br />
                <input
                  type="text"
                  id="userName"
                  name="userName"
                  placeholder="put your name"
                  onChange={this.updateName}
                  required
                />
                <br />
                <br />
                <button type="submit">submit</button>
              </form>
            ) : (
              ""
            )}
            {this.state.turn !== false ? (
              <button onClick={this.adoptDog} className="adopt-button">
                Adopt
              </button>
            ) : (
              ""
            )}
            {this.state.typed && this.state.adopted === false ? (
              <div className="people-list">
                <h3>Waiting List</h3>
                <ul>{peopleList}</ul>
              </div>
            ) : (
              ""
            )}
            {this.state.adopted !== false ? (
              <h2>congratulations !! Now you got a so cute Dog!!</h2>
            ) : (
              ""
            )}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default AdoptDogs;
