import React, { useState } from 'react'
import ReactDOMServer from 'react-dom/server'
import axios from 'axios';

import { useEffect } from 'react';

import Flashcard from '../components/Flashcard';

const cssStyles = `<style>
.flashcard {
    width: 320px;
    height: 192px;

    background-color: transparent;
    perspective: 1000px;
}

.vorderseite,
.rückseite {
    position: relative;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;

    text-align: center;


    /* box-shadow card effect */
    border: 6px solid black;
    /* box-shadow: 0 4px 8px 0 #000000; */
}

/* Text zentrieren */
.vorderseite h2,
.rückseite p {
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    transform: translate(-50%, -50%);

    overflow-wrap: break-word;
}
</style>`;

export default function Share() {
    const [flashcardData, setFlashcardData] = useState({});
    const [downloadButtonClicked, setDownloadButtonClicked] = useState(false);

    function download() {
        setDownloadButtonClicked(true);

        var flashcard = ReactDOMServer.renderToString(<Flashcard begriff={flashcardData.begriff} erklärung={flashcardData.erklärung} />);
        flashcard += cssStyles;

        // Create blob link to download
        const url = window.URL.createObjectURL(
            new Blob([flashcard]),
        );
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute(
            'download',
            `Flashcard.html`,
        );

        // Append to html link element page
        document.body.appendChild(link);

        // Start download
        link.click();

        // Clean up and remove the link
        link.parentNode.removeChild(link);

    }

    function confirmDownload() {
        
    }

    useEffect(() => {
        const shareId = window.location.pathname.split('/')[2];
        axios.get('http://localhost:3001/share', {
            params: {
                shareId
            }
        }).then(response => {
            setFlashcardData(response.data);
        }).catch(error => {
            console.log(error);
        });
    }, []);

    return (
        <div>
            <Flashcard begriff={flashcardData.begriff} erklärung={flashcardData.erklärung} />
            <button className='myInput' onClick={download}>Download</button>
            {downloadButtonClicked && <button className='myInput' onClick={confirmDownload}>Confirm Download</button>}
        </div>
    )
}
