import React from "react";

const MyContext = React.createContext({
  cats: [],
  dogs: [],
  people: [],
  updateCats: () => {},
  updateDogs: () => {},
  updateDogPeople: () => {},
  updateCatPeople: () => {},
});

export default MyContext;
