import React, { useState } from 'react'

import '../styles/Flashcard.css'

export default function Flashcard({begriff, erklärung, editable = false}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className={`flashcard`}
      onClick={(e) => {
        // Nur umdrehen beim click auf den Text wenn der Text nicht editierbar ist
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
