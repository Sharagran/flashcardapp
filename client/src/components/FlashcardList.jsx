import React from 'react'
import Flashcard from './Flashcard'

export default function FlashcardList({ flashcard_array }) {
    return (
        <div>
            {
                flashcard_array.map(element => {
                    return <Flashcard rubrik={element.rubrik} begriff={element.begriff}
                        erklärung={element.erklärung} lernStatus={element.lernStatus} />
                })
            }
        </div>
    )
}
