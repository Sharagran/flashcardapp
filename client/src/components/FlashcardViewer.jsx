import React from 'react'
import Flashcard from './Flashcard'

export default function FlashcardViewer({flashcard}) {
  return (
    <div>
      <h2>Flashcard viewer</h2>
      <Flashcard rubrik={flashcard.rubrik} begriff={flashcard.begriff}
          erklärung={flashcard.erklärung} lernStatus={flashcard.lernStatus}/>
      {/* TODO: add swipe controls (siehe Projektbeschreibung) */}
      <button>Hab's drauf</button>
      <button>Kann's nicht</button>
      <button>Überspringen</button>

      {/* nicht sicher bei folgenden funktionen */}
      <button>Teilen</button>
    </div>
  )
}
