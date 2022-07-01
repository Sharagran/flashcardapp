import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useParams, useNavigate } from 'react-router';

import Create from './Create';

const headings = {
  rubrik: 'Neue Rubrik',
  stapel: 'Neuer Stapel'
};



export default function Add() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [textfieldValue, setTextfieldValue] = useState('');

  const [rubrikList, setRubrikList] = useState([]);
  const [rubrik, setRubrik] = useState({});

  useEffect(() => {
    getRubriken().then(rubriken => {
      setRubrikList(rubriken);
      setRubrik(rubriken[0]);
    }).catch(toast.error);
  }, [])


  async function getRubriken() {
    return new Promise((resolve, reject) => {
      axios.get('http://localhost:3001/getRubriken').then(res => {
        resolve(res.data);
      }).catch(err => {
        reject(err.response.data.error);
      });
    });
  }

  function rubrikChanged(e) {
    const rubrik = rubrikList.find(rubrik => rubrik._id === e.target.value)
    setRubrik(rubrik);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (id === 'rubrik') {
      createRubrik();
    } else if (id === 'stapel') {
      createStapel();
    }
  }

  function createRubrik() {
    axios.post('http://localhost:3001/createRubrik', {
      name: textfieldValue,
    }).then(res => {
      toast.success(res.data.message);
      navigate(-1);
    }).catch(toast.error);
  }

  function createStapel() {
    console.log('createStapel');
    console.log(textfieldValue);

    axios.post('http://localhost:3001/createStapel', {
      name: textfieldValue,
      rubrikId: rubrik._id,
    }).then(res => {
      toast.success(res.data.message);
      navigate(-1);
    }).catch(toast.error);
  }

  if (id === 'flashcard') {
    return <Create />
  }

  const rubrikInput = <div className="myInputWrapper">
    <label>Rubrik:</label>
    <select className='myInput' value={rubrik._id} onChange={rubrikChanged} >
      {rubrikList.map(rubrik => <option key={rubrik._id} value={rubrik._id}>{rubrik.name}</option>)}
    </select>
  </div>

  return (
    <>
      <h2>{headings[id]}</h2>
      <form onSubmit={handleSubmit}>
        {id === 'stapel' && rubrikInput}
        <label>{id === 'stapel' ? "Stapel: " : "Rubrik: "}</label>
        <div className="myInputWrapper">
          <input className='myInput' type="text" value={textfieldValue} onChange={(e) => setTextfieldValue(e.target.value)} />
        </div>
        <button className='myInput' type="submit">create</button>
      </form>
    </>
  )
}
