import React from 'react'
import { useState } from 'react';
import axios from 'axios';

import toast from 'react-hot-toast'

export default function FileUpload() {
    const [selectedFiles, setSelectedFiles] = useState([]);

    function handleFileUpload() {
        const formData = new FormData();
        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append('files', selectedFiles[i]);
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
    return (
        <>
            <input id="upload" type="file" name="files" onChange={(e) => setSelectedFiles(e.target.files)} multiple />
            <input type="submit" value="Upload " onClick={handleFileUpload}></input>
        </>
    )
}
