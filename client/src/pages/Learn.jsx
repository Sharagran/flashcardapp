import React from 'react'

import FlashcardViewer from '../components/FlashcardViewer';

export default function Learn() {
  return (
    <div>
        <FlashcardViewer flashcard={
        {
          rubrik: 'TestRubrik',
          begriff: 'TestbegriffTestbegriffTestbegriff',
          erklärung: 'Testerklärung Testerklärung Testerklärung Testerklärung Testerklärung Testerklärung Testerklärung Testerklärung Testerklärung Testerklärung Testerklärung Testerklärung Testerklärung Testerklärung Testerklärung Testerklärung Testerklärung Testerklärung Testerklärung Testerklärung ',
          lernStatus: 'lernen',
          keyword_array: ['test', 'test2'],
          kommentar_array: ['test', 'test2']
        }
      }/>
    </div>
  )
}
