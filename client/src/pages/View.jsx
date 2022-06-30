import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import Learn from './Learn';

import '../styles/view.css'
import { useEffect } from 'react';
import { useState } from 'react';

export default function View() {
    const [rubrikList, setRubrikList] = useState([]);
    const [stapelList, setStapelList] = useState([]);
    const [keywordList, setKeywordList] = useState([]);

    async function getFields() {
        return new Promise((resolve, reject) => {
            axios.get('http://localhost:3001/getFields').then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err.response.data.error);
            });
        });
    }

    useEffect(() => {
        getFields().then(data => {
            setRubrikList(data.rubrik);
            setStapelList(data.stapel);
            setKeywordList(data.keyword_array);
        });
    }, [])

    return (
        <div id='view'>
            <div>
                <h2>Rubriken</h2>
                <div className='categoryContainer'>
                    <div className='category'>
                        <Link to='/add/rubrik'>Neue Rubrik</Link>
                    </div>
                    {rubrikList.map(rubrik => {
                        return <Link key={rubrik} to={`/learn/rubrik/${rubrik}`}><div className='category' key={rubrik}>{rubrik}</div></Link>
                    })}
                </div>

            </div>
            <div>
                <h2>Stapel</h2>
                <div className='categoryContainer'>
                    <div className='category'>
                        <Link to='/add/stapel'>Neuer Stapel</Link>
                    </div>
                    {stapelList.map(stapel => {
                        return <Link key={stapel} to={`/learn/stapel/${stapel}`}><div className='category' key={stapel}>{stapel}</div></Link>
                    })}
                </div>
            </div>
            <div>
                <h2>Keywords</h2>
                <div className='categoryContainer'>
                    {keywordList.map(keyword => {
                        return <Link key={keyword} to={`/learn/keyword/${keyword}`}><div className='category' key={keyword}>{keyword}</div></Link>
                    })}
                </div>
            </div>
            <div>
                <h2>Flashcards</h2>
                <div className='categoryContainer'>
                    <div className='category'>
                        <Link to='/add/flashcard'>Neue Flashcard</Link>
                    </div>
                    { }
                </div>
            </div>
        </div>
    )
}
