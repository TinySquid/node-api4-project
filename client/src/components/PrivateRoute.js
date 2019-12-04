import React from "react";
import { Route, Redirect } from "react-router-dom";
import axios from 'axios';

const isAuthenticated = async () => {
  const token = sessionStorage.getItem("token");
  if (token) {
    return await axios.post('http://localhost:5000/api/validate', { token: token })
      .then(response => {
        if (response.data.isAuthenticated) {
          return true;
        }
      })
      .catch(error => {
        console.log(error)
        return false;
      });
  } else {
    return false;
  }
};

//Ideally route and render a component only if the user is authenticated to see it.
export default function PrivateRoute({ children, ...rest }) {
  return (
    <Route {...rest} render={({ location }) => isAuthenticated() ? (children) : (
      <Redirect to={{ pathname: "/", state: { from: location } }} />
    )} />
  );
}