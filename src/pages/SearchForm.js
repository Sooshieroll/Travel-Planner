import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import '../Search.css';
import { useHistory } from 'react-router-dom';
import setAuthToken from '../utils/setAuthToken';
import Favorites from './Favorites';


require('dotenv').config();
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;


// const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;


function SearchForm(prop) {
    const history = useHistory();
    const [searchTerm, setSearchTerm] = useState([]);
    const [location, setLocation] = useState([]);
    const [result, setResult] = useState([]);
    // const url = `${REACT_APP_SERVER_URL}/search?searchTerm=${searchTerm}&location=${location}`

    const handleChangeSearchTerm = e => {
        setSearchTerm(e.target.value)
    }
    const handleChangeLocation = e => {
        setLocation(e.target.value)
    }

    const saveFavActivities = (name, vincinity, rating, types) => {
        setAuthToken(localStorage.getItem('jwtToken'))
        return axios({
            method: 'POST',
            url: `${REACT_APP_SERVER_URL}/favorites`,
            data: {
                name: name,
                address: vincinity,
                rating: rating,
                type_of_establishment: types[0],
                userId: prop.user
            }
        })
            .then(response => {
                console.log(response)
                history.push("/profile/favoritesList")
            })
            .catch(error => console.log(error))
    }

    // useEffect(() => {
    //     axios.get(`${REACT_APP_SERVER_URL}/search`)
    //         .then(response => {
    //             return setSearchTerm((response.data))
    //         });
    //     axios.get(`${REACT_APP_SERVER_URL}/search`)
    //         .then(response => {
    //             return setLocation((response.data))
    //         });

    // }, []);



    function handleSubmit(e) {
        e.preventDefault();
        // alert('Worked!')
        axios.post(`${REACT_APP_SERVER_URL}/search?searchTerm=${searchTerm}&location=${location}`)
            .then(response => {
                console.log(response.data)
                setResult(response.data.search)
            })
            .catch(error => console.log('===> ERROR', error))

    }

    // function saveFavActivities(name, types, rating) {
    //     axios({
    //         method: 'POST',
    //         url: `${REACT_APP_SERVER_URL}/users/saveFavActivities`,
    //         results: {
    //             name: name,
    //             types: types,
    //             rating: rating
    //         }
    //     }).then(response => {
    //         console.log(response)
    //     })
    //         .catch(error => console.log(error))
    // }
    return (
        <>
            <div className='background'>
                <div>
                    <h1>Travel Planner</h1>
                    <p>Easily schedule & plan out your next adventure!</p>
                </div>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label className='searchField'>Search: </Form.Label>

                        <input name="searchTerm" type="text" value={searchTerm} onChange={handleChangeSearchTerm} placeholder="Search for activites, restaurants, etc." required />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className='searchField' >Location: </Form.Label>

                        <input name="location" type="text" value={location} onChange={handleChangeLocation} placeholder="Where would you like to go?" required />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>


                </Form>
            </div>
            {result.map((place, i) => {
                return (<div className='grid-container' key={i + place.name}>
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

                    <button className='favButton' type="submit" onClick={() => saveFavActivities(place.name, place.vincinity, place.rating, place.types[0])}>Add to Favorites </button>
                </div>)
            })}

        </>

    );
}



export default SearchForm;


   // function submit(e) {
    //     e.preventDefault();
    //     Axios.post(url, {
    //         searchTerm: data.searchTerm,
    //         location: data.location
    //     })
    //         .then(res => {
    //             console.log(res.data)
    //         })
    // }
    // function handle(e) {
    //     const newdata = { ...data }
    //     newdata[e.target.id] = e.target.value
    //     setData(newdata)
    //     console.log(newdata)
    // }