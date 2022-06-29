import React from 'react'
import Flashcard from './Flashcard'

export default function FlashcardList({ flashcard_array }) {
    return (
        <>
            {
                flashcard_array.map(element => {
                    return <Flashcard begriff={element.begriff} erklärung={element.erklärung} lernStatus={element.lernStatus}
                        key="UNIQUE" /> //TODO: key ist nicht eindeutig
                })
            }
        </>
    )
}
