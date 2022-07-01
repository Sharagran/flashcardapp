import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Learn from './Learn';

import '../styles/view.css'
import { useEffect } from 'react';
import { useState } from 'react';

export default function View() {
    const [rubrikList, setRubrikList] = useState([]);
    const [stapelList, setStapelList] = useState([]); //TODO: stapel auslagern
    const [keywordList, setKeywordList] = useState([]);
    const [flashcards, setFlashcards] = useState([]);

    async function getRubriken() {
        return new Promise((resolve, reject) => {
            axios.get('http://localhost:3001/getRubriken').then(res => {
                resolve(res.data);
                const list = res.data.map(rubrik => rubrik.name);
                resolve(list);
            }).catch(err => {
                reject(err.response.data.error);
            });
        });
    }

    async function getKeywords() {
        return new Promise((resolve, reject) => {
            axios.get('http://localhost:3001/getKeywords').then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err.response.data.error);
            });
        });
    }

    async function getFlashcards() {
        return new Promise((resolve, reject) => {
            axios.get('http://localhost:3001/getFlashcards').then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err.response.data.error);
            });
        });
    }


    useEffect(() => {
        getRubriken().then(rubriken => {
            setRubrikList(rubriken);
        }).catch(toast.error);

        getKeywords().then(keywords => {
            setKeywordList(keywords);
        }).catch(toast.error);

        getFlashcards().then(flashcards => {
            setFlashcards(flashcards);
        }).catch(toast.error);

    }, [])

    return (
        <div id='view'>
            <div>
                <h2>Rubriken</h2>
                <div className='categoryContainer'>
                    <Link to='/add/rubrik'>
                        <div className='category'>Neue Rubrik</div>
                    </Link>
                    {rubrikList.map(rubrik => {
                        return <Link key={rubrik._id} to={`/learn/rubrik/${rubrik.name}`}><div className='category'>{rubrik.name}</div></Link>
                    })}
                </div>

            </div>
            <div>
                <h2>Stapel</h2>
                <div className='categoryContainer'>
                    <Link to='/add/stapel'>
                        <div className='category'>Neuer Stapel</div>
                    </Link>
                    {stapelList.map(stapel => {
                        return <Link key={stapel} to={`/learn/stapel/${stapel}`}><div className='category'>{stapel}</div></Link>
                    })}
                </div>
            </div>
            <div>
                <h2>Keywords</h2>
                <div className='categoryContainer'>
                    {keywordList.map(keyword => {
                        return <Link key={keyword} to={`/learn/keyword/${keyword}`}><div className='category'>{keyword}</div></Link>
                    })}
                </div>
            </div>
            <div>
                <h2>Flashcards</h2>
                <div className='categoryContainer'>
                    <Link to='/add/flashcard'>
                        <div className='category'>Neue Flashcard</div>
                    </Link>
                    {flashcards.map(flashcard => {
                        return <Link key={flashcard._id} to={`/learn/flashcard/${flashcard.begriff}`}><div className='category'>{flashcard.begriff}</div></Link>
                    })
                    }
                </div>
            </div>
        </div>
    )
}
