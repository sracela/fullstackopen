import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ show, capital }) => {

    const [weather, setWeather] = useState([])

    useEffect(() => {
        axios
        .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${capital}`)
        .then(response => {
            console.log('promise weather fulfilled')
            setWeather(response.data)
        })
    
    }, [capital])

    if(show){

    return (
        <div>
        <h2>Weather in {capital}</h2>
        <p>temperature: {weather.current.temperature}</p>
        <img src={weather.current.weather_icons} alt="weather icon" style={{width: "60px"}} />
        <p>wind: {weather.current.wind_speed} mph direction {weather.current.wind_dir}</p>
        </div>
    )}
    return <></>
}

export default Weather