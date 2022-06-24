import React from 'react'

export default function Flashcard({rubrik, begriff, erklärung, lernStatus, keyword_array, kommentar_array}) {
  return (
    <div>
      <div className='vorderseite'>
        <h2>{begriff}</h2>
        <h6>{rubrik}</h6>
      </div>
      <div className='rückseite'>
        <p>
          {erklärung}
        </p>
      </div>
    </div>
  )
}
