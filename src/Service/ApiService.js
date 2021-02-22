import config from "../config";

const ApiService = {
  getCat() {
    return fetch(`${config.REACT_APP_API_BASE}/api/cats`, {
      headers: {},
    })
      .then((res) =>
        !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
      )
      .catch((err) => console.error(err));
  },
  deleteCat() {
    return fetch(`${config.REACT_APP_API_BASE}/api/cats`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) =>
        !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
      )
      .catch((err) => console.error(err));
  },
  getDog() {
    return fetch(`${config.REACT_APP_API_BASE}/api/dogs`, {
      headers: {},
    })
      .then((res) =>
        !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
      )
      .catch((err) => console.error(err));
  },
  deleteDog() {
    return fetch(`${config.REACT_APP_API_BASE}/api/dogs`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) =>
        !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
      )
      .catch((err) => console.error(err));
  },
  getPeople() {
    return fetch(`${config.REACT_APP_API_BASE}/api/people`, {
      headers: {},
    })
      .then((res) =>
        !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
      )
      .catch((err) => console.error(err));
  },
  addPerson(name) {
    return fetch(`${config.REACT_APP_API_BASE}/api/people`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(name),
    })
      .then((res) =>
        !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
      )
      .catch((err) => console.error(err));
  },
  deletePerson() {
    return fetch(`${config.REACT_APP_API_BASE}/api/people`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) =>
        !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
      )
      .catch((err) => console.error(err));
  },
};

export default ApiService;
