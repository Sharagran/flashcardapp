import React from 'react'
import axios from 'axios';

import Flashcard from '../components/Flashcard'
import { TagInput } from 'reactjs-tag-input'
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';




export default function Create() {
    const navigate = useNavigate();

    const [rubrik, setRubrik] = useState({});
    const [stapel, setStapel] = useState({});
    const [keyword_array, setKeyword_array] = useState([]);
    const [kommentar_array, setKommentar_array] = useState([]);

    const [rubrikList, setRubrikList] = useState([]);
    const [stapelList, setStapelList] = useState([]);

    useEffect(() => {
        getRubriken().then(rubriken => {
            console.log(rubriken);
            if (rubriken.length === 0) {
                toast.error('Es wurden noch keine Rubriken angelegt. Bitte erstellen Sie zuerst eine Rubrik damit Sie diese Funktion nutzen können.');
                navigate(-1);
                return;
            }
            setRubrikList(rubriken);
            setRubrik(rubriken[0]);

            getStapel(rubriken[0]._id).then(stapel => {
                if (stapel.length === 0) {
                    toast.error('Es wurden noch keine Stapel angelegt. Bitte erstellen Sie zuerst einen Stapel damit Sie diese Funktion nutzen können.');
                    navigate(-1);
                    return;
                }
                setStapelList(stapel);
                setStapel(stapel[0]);
            });
        }).catch(toast.error);
    }, [])


    function createFlashcard(e) {
        e.preventDefault();

        const begriff = document.querySelector('.begriff');
        const erklärung = document.querySelector('.erklärung');
        const keywords = keyword_array.map(keyword => keyword.displayValue);

        const flashcard = {
            begriff: begriff.innerHTML,
            erklärung: erklärung.innerHTML,
            stapel: stapel._id,
            keyword_array: keywords,
            kommentar_array: kommentar_array
        }
        const promise = new Promise((resolve, reject) => {
            axios.post('http://localhost:3001/create', flashcard).then(res => {
                resolve(res.data.message);
                clearInputs();
            }).catch(err => {
                reject(err.response.data.error);
            });
        });

        toast.promise(promise, {
            loading: 'Creating flashcard...',
            success: (message) => {
                return message;
            },
            error: (err) => {
                return err;
            }
        });
    }

    function formKeyDown(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    }

    function rubrikChanged(e) {
        const rubrik = rubrikList.find(rubrik => rubrik._id === e.target.value)
        setRubrik(rubrik);
        getStapel(rubrik._id).then(stapel => {
            setStapelList(stapel);
            setStapel(stapel[0]);
        }).catch(toast.error);
    }

    function stapelChanged(e) {
        const stapel = stapelList.find(stapel => stapel._id === e.target.value)
        setStapel(stapel);
    }

    function clearInputs() {
        const begriff = document.querySelector('.begriff');
        const erklärung = document.querySelector('.erklärung');

        begriff.innerHTML = 'Begriff';
        erklärung.innerHTML = 'Erklärung';
    }

    async function getRubriken() {
        return new Promise((resolve, reject) => {
            axios.get('http://localhost:3001/getRubriken').then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err.response.data.error);
            });
        });
    }

    async function getStapel(rubrik) {
        return new Promise((resolve, reject) => {
            axios.get('http://localhost:3001/getStapel/?rubrik=' + rubrik).then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err.response.data.error);
            });
        });
    }

    return (
        <div id='create'>
            <form onSubmit={createFlashcard} onKeyDown={formKeyDown}>
                <div className='center myInputContainer'>
                    <div className='center' style={{
                        marginBottom: '32px',
                    }}>
                        <Flashcard begriff='Begriff' erklärung='Erklärung' editable={true} />
                    </div>
                    <div className="myInputWrapper">
                        <label>Rubrik:</label>
                        <select className='myInput' value={rubrik._id} onChange={rubrikChanged}>
                            {rubrikList.map(rubrik => <option key={rubrik._id} value={rubrik._id}>{rubrik.name}</option>)}
                        </select>
                    </div>
                    <div className="myInputWrapper">
                        <label>Stapel {rubrik.name}:</label>
                        <select className='myInput' value={stapel._id} onChange={stapelChanged}>
                            {stapelList.map(stapel => <option key={stapel._id} value={stapel._id}>{stapel.name}</option>)}
                        </select>
                    </div>
                    <TagInput tags={keyword_array} onTagsChanged={(tags) => setKeyword_array(tags)} placeholder="Keywords"
                        wrapperStyle={`
                         position: static;
                         width: 100%;
                         transform: none;
                         margin-bottom: 32px;
                         `} />
                    <button className='myInput' type="submit">Create</button>
                </div>

            </form>
        </div>
    )
}
