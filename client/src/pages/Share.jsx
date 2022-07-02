import React, { useState } from 'react'
import axios from 'axios';

import { useEffect } from 'react';

import Flashcard from '../components/Flashcard'

export default function Share() {
    const [flashcardData, setFlashcardData] = useState({});

    useEffect(() => {
        const shareId = window.location.pathname.split('/')[2];
        axios.get('http://localhost:3001/share', {
            params: {
                shareId: shareId
            }
        }).then(response => {
            setFlashcardData(response.data);
        }).catch(error => {
            console.log(error);
        });
    }, []);

  return (
    <div>
        <Flashcard begriff={flashcardData.begriff} erklärung={flashcardData.erklärung} />
    </div>
  )
}
