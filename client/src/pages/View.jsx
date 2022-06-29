import React from 'react'
import axios from 'axios'
import { Link, Route } from 'react-router-dom';
import Learn from './Learn';

// https://www.robinwieruch.de/react-router-nested-routes/#:~:text=Nested%20Routes%20are%20a%20powerful,based%20on%20the%20current%20route.

import '../styles/view.css'
import { useEffect } from 'react';
import { useState } from 'react';

export default function View() {
    const [rubrikList, setRubrikList] = useState([]);
    const [stapelList, setStapelList] = useState([]);
    const [keywordList, setKeywordList] = useState([]);

    async function getFields() {
        const promise = new Promise((resolve, reject) => {
            axios.get('http://localhost:3001/getFields').then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err.response.data.error);
            });
        });

        const result = await promise;
        console.log(result);

        setRubrikList(result.rubrik);
        setStapelList(result.stapel);
        setKeywordList(result.keyword_array);
    }

    useEffect(() => {
        getFields();
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
                        return <Link to={`/learn/rubrik/${rubrik}`}><div className='category' key={rubrik}>{rubrik}</div></Link>
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
                        return <Link to={`/learn/stapel/${stapel}`}><div className='category' key={stapel}>{stapel}</div></Link>
                    })}
                </div>
            </div>
            <div>
                <h2>Keywords</h2>
                <div className='categoryContainer'>
                    <div className='category'>
                        <Link to='/add/keyword'>Neues Keyword</Link>
                    </div>
                    {keywordList.map(keyword => {
                        return <Link to={`/learn/keyword/${keyword}`}><div className='category' key={keyword}>{keyword}</div></Link>
                    })}
                </div>
            </div>
            <div>
                <h2>Flashcards</h2>
                <div className='categoryContainer'>
                    <div className='category'>
                        <Link to='/add/flashcard'>Neue Flashcard</Link>
                    </div>
                    {}
                </div>
            </div>
        </div>
    )
}
