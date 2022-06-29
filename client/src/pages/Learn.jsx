import React from 'react'
import axios from 'axios'

import { useState } from 'react';
import { useEffect } from 'react';

import Flashcard from '../components/Flashcard'
import '../styles/Learn.css';
import toast from 'react-hot-toast';


export default function Learn({ rubrik, stapel, keyword }) {
  const [flashcards, setFlashcards] = useState([{}]);
  const [flashCardIndex, setFlashCardIndex] = useState(0);

  useEffect(() => {
    getFlashcards();
  }, [])
  
  async function getFlashcards() {
    const promise = new Promise((resolve, reject) => {
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

    const result = await promise;
    setFlashcards(result);
    console.log(result);
  }

  function nextFlashcard() {
    if (flashCardIndex < flashcards.length - 1) {
      setFlashCardIndex(flashCardIndex + 1);
    } else {
      toast(`Keine weiteren Flashcards ${rubrik ? `in der Rubrik ${rubrik}` : stapel ? `in dem Stapel ${stapel}` : `mit dem keyword ${keyword}`}`, {
        icon: '❕'
        });
    }
  }

  return (
    <div className='center'>
      <h2>Learn</h2>
      <Flashcard
        rubrik={flashcards[flashCardIndex].rubrik}
        begriff={flashcards[flashCardIndex].begriff}
        erklärung={flashcards[flashCardIndex].erklärung}
        lernStatus={flashcards[flashCardIndex].lernStatus}
        editable={false}
      />
      <div>
        <button>Kann's nicht</button>
        <button onClick={nextFlashcard}>Überspringen</button>
        <button>Hab's drauf</button>
        <br />
        {/* nicht sicher bei folgenden funktionen */}
        <button>Teilen</button>
      </div>
    </div>
  )
}
