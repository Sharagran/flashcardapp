import React from 'react'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

export default function Account() {
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [avatar, setAvatar] = useState();

  async function getAccountData() {
    axios.get('http://localhost:3001/accountData').then(res => {
      const data = res.data;

      setEmail(data.email);
      setUsername(data.username);
      setAvatar(data.avatar || "");
    }).catch(err => {
      toast.error(err.message);
    });
  }

  function updateAccountData(e) {
    e.preventDefault();
    const promise = new Promise((resolve, reject) => {
      axios.post('http://localhost:3001/AccountData', {
        email: email,
        username: username,
        avatar: avatar
      }).then(res => {
        resolve(res.data.message);
      }).catch(err => {
        reject(err.response.data.error);
      });
    });

    toast.promise(promise, {
      loading: 'Updating account data...',
      success: (message) => {
        getAccountData();
        return message;
      },
      error: (err) => {
        return err;
      }
    });

  }

  useEffect(() => {
    getAccountData();
  }, []);

  return (
    <div>
      <h2>Account</h2>
      <form onSubmit={updateAccountData}>
        <label htmlFor="email">Email: </label>
        <div className="myInputWrapper">
          <input className='myInput' type="text" name="email" defaultValue={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <br />
        <label htmlFor="username">Username: </label>
        <div className="myInputWrapper">
          <input className='myInput' type="text" name="username" defaultValue={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <br />
        {/* <label htmlFor="avatar">Avatar</label>
        <input type="text" name="avatar" defaultValue={avatar} onChange={(e) => setAvatar(e.target.value)} />
        <br /> */}
        <button className='myInput' type="submit">Submit</button>
      </form>
    </div>
  )
}
