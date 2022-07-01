import React from 'react'
import { useState } from 'react';

import ReactCamera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

export default function Camera() {

    const [dataUri, setDataUri] = useState('');

    function handleTakePhoto(dataUri) {
        // Do stuff with the photo...
        setDataUri(dataUri);
    }

    return (
        <>
            <ReactCamera onTakePhoto={(dataUri) => { handleTakePhoto(dataUri); }} />
            <img src={dataUri} />
        </>
    )
}
