import React from 'react'

export default function Login() {

  // 0 = login, 1 = register, 2 = forgot password
  const [login_option, setLoginOption] = React.useState(0)

  function handleSubmit(e) {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value
    console.log(email, password)
  }

  function handleRegister(e) {
    e.preventDefault()
    setLoginOption(1)
  }

  function handleResetPassword(e) {
    e.preventDefault()
    setLoginOption(2)
  }

  const login_form = (
    <div>
      <form action="" method="post">
        <label htmlFor="email">Email:</label>
        <input type="email" name="email" id="email" />
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" id="password" />
        <input type="submit" value="Login" />
      </form>
      <button onClick={handleRegister}>Register</button>
      <button onClick={handleResetPassword}>Reset Password</button>
    </div>
  );
  const register_form = (
    <form action="" method="post">
      <label htmlFor="email">Email:</label>
      <input type="email" name="email" id="email" />
      <label htmlFor="password">Password:</label>
      <input type="password" name="password" id="password" />
      <input type="submit" value="Register" />
    </form>
  );
  const reset_password_form = (
    <form action="" method="post">
      <label htmlFor="email">Email:</label>
      <input type="email" name="email" id="email" />
      <input type="submit" value="Reset Password" />
    </form>
  );

  const login_option_form = [login_form, register_form, reset_password_form]

  return (
    <div>
      <h1>Login</h1>
      {login_option_form[login_option]}
    </div>
  )
}
