import React from 'react'
import { useState } from 'react';

import Camera from '../components/Camera';
import VoiceRecorder from '../components/VoiceRecorder';
import FileUpload from '../components/FileUpload';

import { toast } from 'react-hot-toast';
import axios from 'axios';

export default function Upload() {
    const [uploadOption, setUploadOption] = useState('');
    const [files, setFiles] = useState([]);

    function upload() {
        console.log(files);
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            if(files[i].blob) {
                formData.append('files', files[i].blob, files[i].name);
            } else {
                formData.append('files', files[i]);
            }
        }
        axios.post('http://localhost:3001/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            toast.success('Upload successful!')
            console.log(res);
        }).catch(err => {
            toast.error('Upload failed!')
        });
    }

    function changeUploadOption(option) {
        setUploadOption(option);
        setFiles([]);
    }

    return (
        <>
            <div>
                <button className='myInput' onClick={() => changeUploadOption('camera')}>Photo</button>
                <button className='myInput' onClick={() => changeUploadOption('voice')}>Voice</button>
                <button className='myInput' onClick={() => changeUploadOption('file')}>File</button>
                <button className='myInput' onClick={upload} disabled={files.length===0}>Upload</button>
            </div>
            <div className='center'>
                {uploadOption === 'camera' && <Camera setFiles={setFiles} />}
                {uploadOption === 'voice' && <VoiceRecorder setFiles={setFiles} upload={upload} />}
                {uploadOption === 'file' && <FileUpload setFiles={setFiles} />}
            </div>
        </>
    )
}
