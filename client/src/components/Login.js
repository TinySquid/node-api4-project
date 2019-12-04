import React, { useState } from "react";

import axios from 'axios';

const Login = ({ history }) => {
  const [inputs, setInputs] = useState({
    username: '',
    password: ''
  });

  const handleInputs = e => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    });
  }

  const handleLogin = e => {
    e.preventDefault();

    //Send payload (username, password)
    axios.post('http://localhost:5000/api/login', inputs)
      .then(response => {
        //Server will respond with a token in the payload if successful

        if (response.data.isLoggedIn) {
          //Store auth token into sessionStorage 
          sessionStorage.setItem('token', response.data.token);

          //Redirect to profile
          history.push('/bubbles');
        }
      })
      .catch(error => console.log(error))
    // when you have handled the token, navigate to the BubblePage route
  }

  return (
    <form className="login" onSubmit={handleLogin}>
      <h1>Welcome to the Bubble App!</h1>
      <label>
        Username:
      <input type="text" name="username" value={inputs.username} onChange={handleInputs} required />
      </label>
      <label>
        Password:
      <input type="password" name="password" value={inputs.password} onChange={handleInputs} required />
      </label>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
