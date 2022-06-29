import React from 'react'
import { useParams } from 'react-router';

import Create from './Create';

export default function Add() {
  const { id } = useParams();

  if(id === 'flashcard') {
    return <Create />
  }

  return (
    <div>Add</div>
  )
}
