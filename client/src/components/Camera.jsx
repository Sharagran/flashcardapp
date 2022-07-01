import React from 'react'
import { useState } from 'react';

import ReactCamera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

export default function Camera({ setFiles }) {

    const [dataUri, setDataUri] = useState('');

    function handleTakePhoto(dataUri) {
        setDataUri(dataUri);

        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + "-" + today.getMinutes() + "-" + today.getSeconds();
        var dateTime = date + "@" + time;

        var binary = atob(dataUri.split(',')[1]);
        var array = [];
        for (var i = 0; i < binary.length; i++) {
            array.push(binary.charCodeAt(i));
        }

        var photo = new Blob([new Uint8Array(array)], { type: 'image/png' });
        console.log(photo);

        setFiles([{
            blob: photo,
            name: dateTime + '.png'
        }]);
    }

    return (
        <>
            <img src={dataUri} alt='' />
            <ReactCamera onTakePhoto={(dataUri) => { handleTakePhoto(dataUri); }} />
        </>
    )
}
