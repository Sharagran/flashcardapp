import React from 'react'

export default function FileUpload({setFiles}) {
    return (
        <>
            <input id="upload" type="file" name="files" onChange={(e) => setFiles(e.target.files)} multiple />
        </>
    )
}
