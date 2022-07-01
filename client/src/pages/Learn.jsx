import React from 'react'
import axios from 'axios'

import { useState } from 'react';
import { useEffect } from 'react';

import Flashcard from '../components/Flashcard'
import '../styles/Learn.css';
import toast from 'react-hot-toast';


export default function Learn({ rubrik, stapel, keyword }) {
  const [flashcardList, setFlashcards] = useState([{}]);
  const [flashcardIndex, setFlashCardIndex] = useState(0);

  useEffect(() => {
    getFlashcards().then(flashcards => {
      setFlashcards(flashcards);
      console.log(flashcards);
    });
  }, [])
  
  async function getFlashcards() {
    return new Promise((resolve, reject) => {
      axios.get(`http://localhost:3001/getFlashCards`, {
        params: {
          rubrik: "1",
          stapel: "2",
          keyword: "3"
        }
      }).then(res => {
        resolve(res.data);
      }).catch(err => {
        reject(err.response.data.error);
      });
    });
  }

  // TODO: zufällige Flashcards auswählen
  function nextFlashcard() {
    if (flashcardIndex < flashcardList.length - 1) {
      setFlashCardIndex(flashcardIndex + 1);
    } else {
      toast(`Keine weiteren Flashcards ${rubrik ? `in der Rubrik ${rubrik}` : stapel ? `in dem Stapel ${stapel}` : `mit dem keyword ${keyword}`}`, {
        icon: '❕'
        });
    }
  }

  async function setLernstatus(lernStatus) {
    console.log(flashcardList[flashcardIndex]);
    axios.post(`http://localhost:3001/setLernstatus`, {
      id: flashcardList[flashcardIndex]._id,
      lernStatus: lernStatus
    }).then(res => {
      console.log(res.data);
      nextFlashcard();
    }).catch(err => {
      toast.error(err.response.data.error);
    });
  }

  function teilen() {
    throw new Error("Not implemented"); //TODO: 
  }

  if (flashcardList.length === 0) {
    return <div>Keine Flashcards gefunden</div>
  }

  return (
    <div className='center'>
      <h2>Learn</h2>
      <Flashcard
        rubrik={flashcardList[flashcardIndex].rubrik}
        begriff={flashcardList[flashcardIndex].begriff}
        erklärung={flashcardList[flashcardIndex].erklärung}
        lernStatus={flashcardList[flashcardIndex].lernStatus}
      />
      <div>
        <button onClick={() => {setLernstatus(-1)}}>Kann's nicht</button>
        <button onClick={nextFlashcard}>Überspringen</button>
        <button onClick={() => {setLernstatus(1)}}>Hab's drauf</button>
        <br />
        {/* nicht sicher bei folgenden funktionen */}
        <button onClick={teilen}>Teilen</button>
      </div>
    </div>
  )
}
