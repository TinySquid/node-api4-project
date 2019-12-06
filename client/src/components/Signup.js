import React, { useState } from "react";

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

    axios.post(`${base_url}/api/user/signup`, inputs)
      .then(response => {
        history.push('/login');
      })
      .catch(error => {
        setError("User already exists");
      });
  }

  return (
    <form className="login" onSubmit={handleLogin}>
      <h1>Create an account</h1>
      <h3 className="login__error" style={{ color: 'red' }}>{error}</h3>
      <label>
        Username:
      <input type="text" name="username" value={inputs.username} onChange={handleInputs} required />
      </label>
      <label>
        Password:
      <input type="password" name="password" value={inputs.password} onChange={handleInputs} required />
      </label>
      <Link to="/login" className="signup__link">Already have an account? Login here.</Link>
      <button type="submit">Signup</button>
    </form>
  );
};

export default Login;
