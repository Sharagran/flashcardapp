// import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';

import Account from './pages/Account';
import Dashboard from './pages/Dashboard';
import Files from './pages/Files';
import Login from './pages/Login';
import Learn from './pages/Learn';

import useToken from './components/useToken';
import Navbar from './components/Navbar';

function App() {
  const { token, setToken } = useToken();

  var content = <BrowserRouter>
  <Routes>
    <Route exact path="/" element={<Dashboard />}></Route>
    <Route path="/learn" element={<Learn />}></Route>
    {/* <Route path="/files" element={<Files />}></Route> */}
    <Route path="/account" element={<Account />}></Route>
    </Routes>
</BrowserRouter>;

  console.log(window.location.pathname);

  // Seite ohne Authentifizierung
  if (window.location.pathname === '/files') {
    content = <Files />;
  }

  // TODO: token verifizieren
  if (token) {
    axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` };
  } else {
    content = <Login setToken={setToken} />;
  }

  return (
    <div>
      <Toaster position="bottom-right" />
      <Navbar />
      <h1>Flashcard app</h1>
      {content}
    </div>
  );
}

export default App;
