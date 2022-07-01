import React from 'react'
import { useState } from 'react';

import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

export default function Upload() {
    const [dataUri, setDataUri] = useState('');

    function handleTakePhoto(dataUri) {
        // Do stuff with the photo...
        setDataUri(dataUri);
    }

    return (
        <>
            <div className='center'>
                <Camera onTakePhoto={(dataUri) => { handleTakePhoto(dataUri); }} />
                <img src={dataUri} />
            </div>

        </>
    )
}
