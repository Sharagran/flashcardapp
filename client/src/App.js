// import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Account from './pages/Account';
import Dashboard from './pages/Dashboard';
import Files from './pages/Files';
import Login from './pages/Login';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Dashboard />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/files" element={<Files />}></Route>
        <Route path="/account" element={<Account />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
