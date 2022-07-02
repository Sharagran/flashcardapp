// import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';

import Account from './pages/Account';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Learn from './pages/Learn';
import View from './pages/View';
import Add from './pages/Add';
import Upload from './pages/Upload';
import Share from './pages/Share';

import useToken from './components/useToken';
import Navbar from './components/Navbar';

function App() {
  const { token, setToken } = useToken();

  // TODO: conditional rendering
  var content = <BrowserRouter>
    <Navbar />
    <h1>Flashcard app</h1>
    <Routes>
      <Route exact path="/" element={<Dashboard />}></Route>
      <Route path="/view" element={<View />}></Route>
      <Route path="/add/:id" element={<Add />}></Route>

      {/* learn all cards */}
      <Route path="/learn" element={<Learn />}></Route>
      {/* TODO: set filter from URL paramaets */}
      <Route path="/learn/:id" element={<Dashboard />}></Route>


      <Route path="/upload" element={<Upload />}></Route>
      <Route path="/account" element={<Account />}></Route>
    </Routes>
  </BrowserRouter>;

  // console.log(window.location.pathname);

  // Seite ohne Authentifizierung
  if (window.location.pathname.startsWith('/share/')) {
    content = <Share />;
  } else {
    if (token) {
      axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` };
    } else {
      content = <Login setToken={setToken} />;
    }
  }

  return (
    <div>
      <Toaster position="bottom-right" />
      {content}
    </div>
  );
}

export default App;
