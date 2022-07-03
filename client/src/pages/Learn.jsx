import React from 'react'
import axios from 'axios'

import { useState } from 'react';
import { useEffect } from 'react';

import Flashcard from '../components/Flashcard'
import Share from '../components/Share';
import {toast} from 'react-hot-toast';


export default function Learn({ rubrik, stapel, keyword }) {
  const [flashcardList, setFlashcards] = useState([{}]);
  const [flashcardIndex, setFlashCardIndex] = useState(0);
  const [renderTeilenUI, setRenderTeilenUI] = useState(false);

  useEffect(() => {
    getFlashcards().then(flashcards => {
      setFlashcards(flashcards);
      console.log(flashcards);
    });
  }, [])

  //TODO: change query & serverside route function
  async function getFlashcards() {
    //TODO: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
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

  function nextFlashcard() {
    if (flashcardIndex < flashcardList.length - 1) {
      setFlashCardIndex(flashcardIndex + 1);
    } else {
      toast(`Keine weiteren Flashcards ${rubrik ? `in der Rubrik ${rubrik}` : stapel ? `in dem Stapel ${stapel}` : keyword ? `mit dem keyword ${keyword}` : ``}`, {
        icon: '❕'
      });
    }
  }

  async function setLernstatus(lernStatus) {
    axios.post(`http://localhost:3001/setLernstatus`, {
      id: flashcardList[flashcardIndex]._id,
      lernStatus: lernStatus
    }).then(res => {
      toast.success(res.data.message);
      nextFlashcard();
    }).catch(err => {
      toast.error(err.response.data.error);
    });
  }



  if (flashcardList.length === 0) {
    return <div>Keine Flashcards gefunden</div>
  }

  return (
    <div className='center'>
      <Flashcard
        rubrik={flashcardList[flashcardIndex].rubrik}
        begriff={flashcardList[flashcardIndex].begriff}
        erklärung={flashcardList[flashcardIndex].erklärung}
        lernStatus={flashcardList[flashcardIndex].lernStatus}
      />
      <div>
        <button className='myInput' onClick={() => { setLernstatus(-1) }}>Kann's nicht</button>
        <button className='myInput' onClick={nextFlashcard}>Überspringen</button>
        <button className='myInput' onClick={() => { setLernstatus(1) }}>Hab's drauf</button>
        <br />
        {/* nicht sicher bei folgenden funktionen */}
        <button className='myInput' onClick={() => setRenderTeilenUI(!renderTeilenUI)}>Teilen</button>
        {renderTeilenUI && <Share flashcardId={flashcardList[flashcardIndex]._id} setRenderTeilenUI={setRenderTeilenUI} />}
      </div>
    </div>
  )
}
