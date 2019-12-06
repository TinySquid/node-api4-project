import React, { useState } from "react";
import { Link } from 'react-router-dom';

import axios from 'axios';

import { base_url } from './base_url';

const Login = ({ history }) => {
  const [inputs, setInputs] = useState({
    username: '',
    password: ''
  });

  const [error, setError] = useState('');

  const handleInputs = e => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    });
  }

  const handleLogin = e => {
    e.preventDefault();

    //Send payload (username, password)
    axios.post(`${base_url}/api/user/login`, inputs)
      .then(response => {
        //Server will respond with a token in the payload if successful
        const token = response.data.token;
        if (token) {
          //Store auth token into sessionStorage 
          sessionStorage.setItem('token', token);

          //Redirect to profile
          history.push('/bubbles');
        }
      })
      .catch(error => {
        setError("Invalid username / password combination");
      });
    // when you have handled the token, navigate to the BubblePage route
  }

  return (
    <form className="login" onSubmit={handleLogin}>
      <h1>Welcome to the Bubble App!</h1>
      <h3 className="login__error" style={{ color: 'red' }}>{error}</h3>
      <label>
        Username:
      <input type="text" name="username" value={inputs.username} onChange={handleInputs} required />
      </label>
      <label>
        Password:
      <input type="password" name="password" value={inputs.password} onChange={handleInputs} required />
      </label>
      <Link to="/signup" className="signup__link">Need an account? Register here.</Link>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
