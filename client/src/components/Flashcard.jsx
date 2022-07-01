import React, { useState } from 'react'

import '../styles/Flashcard.css'

// lernstatus: 0 = noch zu lernen, 1 = hab's drauf, -1 = kann's nicht
export default function Flashcard({begriff, erklärung, rubrik, stapel, lernStatus, keyword_array = [], kommentar_array = [], editable = false}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className={`flashcard`}
      onClick={(e) => {
        if (e.target.nodeName === 'DIV' | !editable) {
          setFlipped(!flipped);
        }
      }}
    >
      <div className={`flashcard-inner ${flipped ? 'flipped' : ''}`}>
      <div className='vorderseite'>
        <h2 className='begriff' contentEditable={editable} suppressContentEditableWarning={editable}>{begriff}</h2>
      </div>
      <div className='rückseite'>
        <p className='erklärung' contentEditable={editable} suppressContentEditableWarning={editable}>
          {erklärung}
        </p>
      </div>
      </div>
    </div>
  )
}
