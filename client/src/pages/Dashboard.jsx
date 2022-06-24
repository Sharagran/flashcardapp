import React from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Dashboard() {
  function test() {
    console.log(axios.defaults.headers.common);
    axios.get('http://localhost:3001/test');
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={test}>Test</button>
    </div>
  )
}
