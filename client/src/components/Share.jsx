import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast';

export default function Share({ flashcardId, setRenderTeilenUI }) {
    const [email, setEmail] = useState('');
    const [expires, setExpires] = useState(getMinDate());
    const [deleteAfter, setDeleteAfter] = useState(false);

    function getMinDate() {
        let date = new Date()
        date.setDate(date.getDate() + 1);
        date = date.toISOString().split('T')[0];

        return date;
    }

    function share() {
        axios.post(`http://localhost:3001/share`, {
            id: flashcardId,
            email: email,
            expires: expires,
            deleteAfter: deleteAfter
        }).then(res => {
            toast.success(res.data.message);
            const host = window.location.host;
            const shareLink = `http://${host}/share/${res.data.shareId}`;
            navigator.clipboard.writeText(shareLink).then(() => {
                toast.success('Link wurde in die Zwischenablage kopiert');
            }).catch(err => {
                toast.error('Link konnte nicht in die Zwischenablage kopiert werden. Siehe Konsole für Details');
                console.log(err);
                console.log(shareLink);
            });

            setRenderTeilenUI(false);
        }).catch(err => {
            toast.error(err.response.data.error);
        });
    }

    return (
        <div className='center' style={{
            width: '50%',
        }}>
            <input className='myInput' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className='myInput' type="date" value={expires} onChange={(e) => setExpires(e.target.value)} min={getMinDate()}></input>
            <input className='myInput' type="checkbox" checked={deleteAfter} onChange={() => setDeleteAfter(!deleteAfter)} />
            <button className='myInput' onClick={share}>Teilen bestätigen</button>
        </div>
    )
}
