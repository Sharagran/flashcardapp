import React from 'react'
import { useState } from 'react';

import Camera from '../components/Camera';
import VoiceRecorder from '../components/VoiceRecorder';
import FileUpload from '../components/FileUpload';

export default function Upload() {

    const [uploadOption, setUploadOption] = useState('');

    return (
        <>
            <div>
                <button className='myInput' onClick={() => setUploadOption('camera')}>Photo</button>
                <button className='myInput' onClick={() => setUploadOption('voice')}>Voice</button>
                <button className='myInput' onClick={() => setUploadOption('file')}>File</button>
            </div>
            <div className='center'>
                {uploadOption === 'camera' && <Camera />}
                {uploadOption === 'voice' && <VoiceRecorder />}
                {uploadOption === 'file' && <FileUpload />}
            </div>
        </>
    )
}
