import React from 'react'

import axios from 'axios';

export default function File({ Filename }) {

    function download() {
        axios.get('http://localhost:3001/getFile', {
            params: {
                Filename
            },
            responseType: 'blob'
        }).then(file => {
            const url = window.URL.createObjectURL(new Blob([file.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', Filename);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        }
        ).catch(err => {
            console.log(err);
        });
    }

    return (
        <div className='category' onClick={download}>{Filename}</div>
    )
}
