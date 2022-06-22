// import logo from './logo.svg';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Account from './pages/Account';
import Dashboard from './pages/Dashboard';
import Files from './pages/Files';
import Login from './pages/Login';

import useToken from './components/useToken';


function App() {
  const { token, setToken } = useToken();

  console.log(window.location.pathname);

  // Seite ohne Authentifizierung
  if(window.location.pathname === '/files') {
    return <Files />;
  }

  // TODO: token verifizieren
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
