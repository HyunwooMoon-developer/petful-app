import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import MyContext from "../../Context/Context";
import ApiService from "../../Service/ApiService";
import About from "../About/About";
import Adopt from "../Adopt/Adopt";
import AdoptDogs from "../AdoptDogs/AdoptDogs";
import AdoptCats from "../AdpotCats/AdoptCats";
import Contact from "../Contact/Contact";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import Main from "../Main/Main";
import Nav from "../Nav/Nav";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import "./App.css";

class App extends Component {
  state = {
    cats: [],
    dogs: [],
    dogPeople: [],
    catPeople: [],
  };

  updateCats = () => {
    ApiService.getCat().then((cats) =>
      this.setState({
        cats,
      })
    );
  };

  updateDogs = () => {
    ApiService.getDog().then((dogs) =>
      this.setState({
        dogs,
      })
    );
  };

  updateDogPeople = () => {
    ApiService.getPeople().then((people) =>
      this.setState({
        dogPeople: people,
      })
    );
  };

  updateCatPeople = () => {
    ApiService.getPeople().then((people) =>
      this.setState({
        catPeople: people,
      })
    );
  };

  componentDidMount() {
    this.updateCats();
    this.updateDogs();
    this.updateDogPeople();
    this.updateCatPeople();
  }
  render() {
    const contextValue = {
      cats: this.state.cats,
      dogs: this.state.dogs,
      dogPeople: this.state.dogPeople,
      catPeople: this.state.catPeople,
      updateCats: this.updateCats,
      updateDogs: this.updateDogs,
      updateDogPeople: this.updateDogPeople,
      updateCatPeople: this.updateCatPeople,
    };
    return (
      <div className="App">
        <MyContext.Provider value={contextValue}>
          <header>
            <h1>
              <Link to="/">PETFUL</Link>
            </h1>
            <Nav />
          </header>
          <ErrorBoundary>
            <main className="main">
              <Switch>
                <Route exact path="/" component={Main} />
                <Route path="/about" component={About} />
                <Route exact path="/adopt" component={Adopt} />
                <Route path="/adopt/cats" component={AdoptCats} />
                <Route path="/adopt/dogs" component={AdoptDogs} />
                <Route path="/contact" component={Contact} />
                <Route component={NotFoundPage} />
              </Switch>
            </main>
          </ErrorBoundary>
          <footer>
            <p>&copy; Hyunwoo Moon Petful 2021</p>
          </footer>
        </MyContext.Provider>
      </div>
    );
  }
}

export default App;
