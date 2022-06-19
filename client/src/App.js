// import logo from './logo.svg';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Account from './pages/Account';
import Dashboard from './pages/Dashboard';
import Files from './pages/Files';
import Login from './pages/Login';

import useToken from './useToken';

function setToken(userToken) {
  sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken?.token
}

function App() {
  const token = getToken();

  console.log(window.location.pathname);

  // Seite ohne Authentifizierung
  if(window.location.pathname === '/files') {
    return <Files />;
  }

  if(!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <div>
    <h1>Flashcard app</h1>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Dashboard />}></Route>
        {/* <Route path="/files" element={<Files />}></Route> */}
        <Route path="/account" element={<Account />}></Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
