import React from 'react'
import axios from 'axios';

import Flashcard from '../components/Flashcard'
import { TagInput } from 'reactjs-tag-input'
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useEffect } from 'react';


export default function Create() {
    const [rubrik, setRubrik] = useState('');
    const [stapel, setStapel] = useState('');
    const [keyword_array, setKeyword_array] = useState([]);
    const [kommentar_array, setKommentar_array] = useState([]);

    const [rubrikList, setRubrikList] = useState([]);
    const [stapelList, setStapelList] = useState([]);

    useEffect(() => {
        getFields().then(data => {
            setRubrikList(data.rubrik);
            setStapelList(data.stapel);

            setRubrik(data.rubrik[0]);
            setStapel(data.stapel[0]);
        });
    }, [])


    function createFlashcard(e) {
        e.preventDefault();

        const begriff = document.querySelector('.begriff');
        const erklärung = document.querySelector('.erklärung');
        const keywords = keyword_array.map(keyword => keyword.displayValue);

        const flashcard = {
            begriff: begriff.innerHTML,
            erklärung: erklärung.innerHTML,
            rubrik: rubrik,
            stapel: stapel,
            lernStatus: 0,
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

    function clearInputs() {
        const begriff = document.querySelector('.begriff');
        const erklärung = document.querySelector('.erklärung');

        begriff.innerHTML = 'Begriff';
        erklärung.innerHTML = 'Erklärung';

        setRubrik('');
        setStapel('');
        setKeyword_array([]);
        setKommentar_array([]);
    }

    function getFields() {
        return new Promise((resolve, reject) => {
            axios.get('http://localhost:3001/getFields').then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err.response.data.error);
            });
        });
    }

    return (
        <div id='create'>
            <h2>Create</h2>
            <form onSubmit={createFlashcard} onKeyDown={formKeyDown}>
                <div className='center myInputContainer'>
                    <div className='center' style={{
                        marginBottom: '32px',
                    }}>
                        <Flashcard begriff='Begriff' erklärung='Erklärung' editable={true} />
                    </div>
                    <div className="myInputWrapper">
                        <label>Rubrik:</label>
                        <select className='myInput' value={rubrik} onChange={(e) => setRubrik(e.target.value)}>
                            {rubrikList.map(rubrik => <option key={rubrik} value={rubrik}>{rubrik}</option>)}
                        </select>
                    </div>
                    <div className="myInputWrapper">
                        <label>Stapel {rubrik}:</label>
                        <select className='myInput' value={stapel} onChange={(e) => setStapel(e.target.value)}>
                            {stapelList.map(stapel => <option key={stapel} value={stapel}>{stapel}</option>)}
                        </select>
                    </div>
                    <TagInput tags={keyword_array} onTagsChanged={(tags) => setKeyword_array(tags)} placeholder="Keywords"
                        wrapperStyle={`
                         position: static;
                         width: 100%;
                         transform: none;
                         margin-bottom: 32px;
                         `} />
                    <button type="submit">Create</button>
                </div>

            </form>
        </div>
    )
}
