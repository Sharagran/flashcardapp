import React from 'react'
import Flashcard from './Flashcard'

export default function FlashcardViewer({ flashcard }) {
  return (
    <div className='center'>
      <h2>Flashcard viewer</h2>
      <Flashcard rubrik={flashcard.rubrik} begriff={flashcard.begriff}
        erklärung={flashcard.erklärung} lernStatus={flashcard.lernStatus} editable={false} />
      {/* TODO: add swipe controls (siehe Projektbeschreibung) */}
      <div>
        <button>Kann's nicht</button>
        <button>Überspringen</button>
        <button>Hab's drauf</button>
        <br />
        {/* nicht sicher bei folgenden funktionen */}
        <button>Teilen</button>
      </div>
    </div>
  )
}
