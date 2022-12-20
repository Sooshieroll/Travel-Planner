import React from 'react';
import SearchForm from './SearchForm';
import '../Search.css';

const Welcome = () => {
    return (
        <div>
            <div>
                <h1>Travel Planner</h1>
                <p>Easily schedule & plan out your next adventure!</p>
            </div>
            <div className='search'>
                <SearchForm />
            </div>
        </div>
    )
}

export default Welcome;