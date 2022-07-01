import React from 'react'
import { useState } from 'react'

import { Recorder } from 'react-voice-recorder'
import 'react-voice-recorder/dist/index.css'

export default function VoiceRecorder({ setFiles, upload }) {
    const [audioDetails, setAudioDetails] = useState({
        url: null,
        blob: null,
        chunks: null,
        duration: {
            h: 0,
            m: 0,
            s: 0
        }
    });

    function handleAudioStop(data) {
        console.log(data);
        setAudioDetails(data);
        prepareUpload(data.blob);
    }

    function handleAudioUpload(file) {
        console.log(file);
        prepareUpload(file);
        upload();
    }

    function prepareUpload(file) {
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + "-" + today.getMinutes() + "-" + today.getSeconds();
        var dateTime = date + "@" + time;

        setFiles([{
            blob: file,
            name: dateTime + '.webm'
        }]);
    }

    function handleReset() {
        const reset = {
            url: null,
            blob: null,
            chunks: null,
            duration: {
                h: 0,
                m: 0,
                s: 0
            }
        };
        setAudioDetails(reset);
    }
    return (
        <>
            <Recorder
                record={true}
                title={"New recording"}
                audioURL={audioDetails.url}
                showUIAudio
                handleAudioStop={data => handleAudioStop(data)}
                handleAudioUpload={data => handleAudioUpload(data)}
                handleReset={() => handleReset()}
                mimeTypeToUseWhenRecording={`audio/webm`} // For specific mimetype.
            />
        </>
    )
}
