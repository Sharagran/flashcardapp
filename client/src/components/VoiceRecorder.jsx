import React from 'react'
import { useState } from 'react'

import { Recorder } from 'react-voice-recorder'
import 'react-voice-recorder/dist/index.css'

export default function VoiceRecorder() {
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

    function handleAudioStop(data){
        console.log(data)
        setAudioDetails(data)
    }

    function handleAudioUpload(file) {
        console.log(file);
    }

    function handleCountDown(data) {
        console.log(data);
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
                handleCountDown={data => handleCountDown(data)}
                handleReset={() => handleReset()}
                mimeTypeToUseWhenRecording={`audio/webm`} // For specific mimetype.
            />
        </>
    )
}
