import React, { useState } from 'react'

import '../styles/Flashcard.css'

export default function Flashcard({rubrik, begriff, erklärung, lernStatus, keyword_array, kommentar_array}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className={`flashcard`}
      onClick={(e) => setFlipped(!flipped)}
    >
      <div className={`flashcard-inner ${flipped ? 'flipped' : ''}`}>
      <div className='vorderseite'>
        <h2>{begriff}</h2>
      </div>
      <div className='rückseite'>
        <p>
          {erklärung}
        </p>
      </div>
      </div>
    </div>
  )
}
