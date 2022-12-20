import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken'

const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL



function Favorites() {
    const [favorites, setFavorites] = useState([])
    useEffect(() => {
        setAuthToken(localStorage.getItem('jwtToken'))
        axios.get(`${REACT_APP_SERVER_URL}/favorites`)
            .then(response => {
                setFavorites(response.data);
            })
            .catch(error => console.log(error));
    }, [])

    function removeFromFavorites(id) {
        axios({
            method: 'delete',
            url: `${REACT_APP_SERVER_URL}/favorites/${id}`

        })
            .then(response => {
                console.log(response)
                setFavorites(response.data.favorites)
            })
            .catch(error => console.log(error));
    }

    const renderFavorites = () => {
        if (favorites.length) {
            let favoritesArray = favorites.map((place, idx) => <div key={idx}>
                <div className='grid-item'>
                    <b>Name: </b> {place.name}
                </div>
                <div className='grid-item'>
                    <b>Address: </b> {place.vicinity}
                </div>
                <div className='grid-item'>
                    <b>Rating:</b> {place.rating} stars
                </div>
                <div className='grid-item'>
                    <b>Type of Establishment: </b> {place.types[0]}
                </div>
                <button onClick={() => { removeFromFavorites(place.id) }} type="button" className='remove-button'>Remove</button>
            </div>)
            return favoritesArray
        } else {
            return <h1>No favorites yet!</h1>
        }
    }
    return (
        <div className='creator-fav' style={{ height: '100vh' }} >
            {renderFavorites()}
        </div>
    )
}

export default Favorites;
