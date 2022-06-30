import React from 'react'
import { useParams } from 'react-router';

import Create from './Create';

const id_strings = {
    rubrik: 'Rubrik',
    stapel: 'Stapel',
    begriff: 'Begriff',
};



export default function Add() {
  const { id } = useParams();
  
  function handleSubmit(e) {
    e.preventDefault();
  }



  if(id === 'flashcard') {
    return <Create />
  }

  return (
    <div>
      <h2>{id_strings[id]}</h2>
      <form onSubmit={handleSubmit}>
        <button type="submit">create</button>
      </form>
    </div>
  )
}
