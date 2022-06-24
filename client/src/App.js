// import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

import Account from './pages/Account';
import Dashboard from './pages/Dashboard';
import Files from './pages/Files';
import Login from './pages/Login';

import useToken from './components/useToken';

function App() {
  const { token, setToken } = useToken();
  var renderOptionValue = 2;

  console.log(window.location.pathname);

  // Seite ohne Authentifizierung
  if (window.location.pathname === '/files') {
    renderOptionValue = 1;
  }

  // TODO: token verifizieren
  if (token) {
    axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` };
  } else {
    renderOptionValue = 0;
  }

  const login_page = (<Login setToken={setToken} />);
  const file_page = (<Files />);
  const app_router = (<BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Dashboard />}></Route>
      {/* <Route path="/files" element={<Files />}></Route> */}
      <Route path="/account" element={<Account />}></Route>
      </Routes>
  </BrowserRouter>);

const render_option = [login_page, file_page, app_router]

return (
  <div>
    <Toaster position="top-right" />
    <h1>Flashcard app</h1>
    {render_option[renderOptionValue]}
  </div>
)



  return (
    <div>
      <Toaster position="top-right" />
      <h1>Flashcard app</h1>
      {
        window.location.pathname === '/files' ?
          <Files /> :
        !token ?
          <Login setToken={setToken} /> :
        (axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` },
          <BrowserRouter>
            <Routes>
              <Route exact path="/" element={<Dashboard />}></Route>
              {/* <Route path="/files" element={<Files />}></Route> */}
              <Route path="/account" element={<Account />}></Route>
              </Routes>
          </BrowserRouter>)
      }
    </div>
  );
}

export default App;
