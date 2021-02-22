import React, { Component, Fragment } from "react";
import MyContext from "../../Context/Context";
import ApiService from "../../Service/ApiService";
import "./AdoptCats.css";

class AdoptCats extends Component {
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

    ApiService.addPerson(userName).then(this.context.updateCatPeople(userName));

    this.addUser();
    this.deleteCats();
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

  adoptCat = () => {
    ApiService.deleteCat()
      .then((cats) => {
        this.context.updateCats(cats);
      })
      .then(() => {
        ApiService.deletePerson().then((people) => {
          this.context.updateCatPeople(people);
        });
      })
      .then(
        this.setState({
          turn: false,
          adopted: true,
        })
      );
  };
  deleteCats = () => {
    this.interval = setInterval(() => {
      ApiService.deleteCat().then((cats) => {
        this.context.updateCats(cats);
      });
      ApiService.deletePerson().then((people) => {
        this.context.updateCatPeople(people);
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
      { name: "Tom" },
      { name: "Juliet" },
      { name: "Romeo" },
      { name: "Author" },
      { name: "Jessica" },
    ];

    let i = 0;
    this.interval = setInterval(() => {
      ApiService.addPerson(users[i]).then(i++);
    }, 3000);
  };

  render() {
    const { cats = [], catPeople = [] } = this.context;

    const peopleList = catPeople.map((person, key) => (
      <li key={key}>{person.name}</li>
    ));
    const page = this.state.page;
    const cat = cats[page] || {};
    return (
      <Fragment>
        <div className="adopt-cat">
          <div className="cat-info">
            <div>
              <img src={cat.imageURL} alt={cat.description} />
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
              {page === cats.length - 1 ? (
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
              <h2>name : {cat.name}</h2>
              <h4>breed : {cat.breed}</h4>
              <h4>gender : {cat.gender}</h4>
              <h4>age : {cat.age}</h4>
              <h4>story : {cat.story}</h4>
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
              <button onClick={this.adoptCat} className="adopt-button">
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
              <h2>congratulations !! Now you got a so cute Cat!!</h2>
            ) : (
              ""
            )}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default AdoptCats;
