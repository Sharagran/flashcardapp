import React from 'react'
import Flashcard from './Flashcard'

export default function FlashcardViewer({flashcard_array}) {
  return (
    <div>
      <h2>Flashcard viewer</h2>
      {
        flashcard_array.map(element => {
          return <Flashcard rubrik={element.rubrik} begriff={element.begriff}
          erklärung={element.erklärung} lernStatus={element.lernStatus}/>
        })
      }
      {/* TODO: add swipe controls (siehe Projektbeschreibung) */}
      <button>Hab's drauf</button>
      <button>Kann's nicht</button>
      <button>Überspringen</button>

      {/* nicht sicher bei folgenden funktionen */}
      <button>Teilen</button>
    </div>
  )
}
