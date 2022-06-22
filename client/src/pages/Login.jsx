import React, { useState } from 'react'
import PropTypes from 'prop-types';

async function loginUser(credentials) {
  return fetch('http://localhost:3001/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

async function registerUser(credentials) {
  return fetch('http://localhost:3001/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}


export default function Login({ setToken }) {
  // 0 = login, 1 = register, 2 = forgot password
  const [login_option, setLoginOption] = useState(0)

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  async function handleSubmit(e) {
    e.preventDefault();
    if (login_option === 0) {
      const token = await loginUser({
        email,
        password
      });
      console.log("token: ", token);
      setToken(token);
    } else if (login_option === 1) {
      const token = await registerUser({
        email,
        password
      });
      console.log("token: ", token);
      setToken(token);
    }

  }

  const login_form = (
    <div>
      <form action="" method="post" onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input type="email" name="email" id="email" onChange={e => setEmail(e.target.value)} />
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" id="password" onChange={e => setPassword(e.target.value)} />
        <input type="submit" value="Login" />
      </form>
      <button onClick={e => setLoginOption(1)}>Registrieren</button>
      <button onClick={e => setLoginOption(2)}>Reset Password</button>
    </div>
  );
  const register_form = (
    <div>
      <form action="" method="post">
        <label htmlFor="email">Email:</label>
        <input type="email" name="email" id="email" onChange={e => setEmail(e.target.value)} />
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" id="password" onChange={e => setPassword(e.target.value)} />
        <input type="submit" value="Register" />
      </form>
      <button onClick={e => setLoginOption(0)}>zurück zum Login</button>
    </div>
  );
  const reset_password_form = (
    <div>
      <form action="" method="post">
        <label htmlFor="email">Email:</label>
        <input type="email" name="email" id="email" onChange={e => setEmail(e.target.value)} />
        <input type="submit" value="Reset Password" />
      </form>
      <button onClick={e => setLoginOption(0)}>zurück zum Login</button>
    </div>
  );

  const login_option_form = [login_form, register_form, reset_password_form]

  return (
    <div>
      <h1>Login</h1>
      {login_option_form[login_option]}
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}
