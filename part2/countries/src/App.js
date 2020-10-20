import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Countries from './components/Countries'
import Country from './components/Country';
import axios from 'axios'


const App = () => {
const [countries, setCountries] = useState([])
const [newFilter, setNewFilter] = useState('')

useEffect(() => {
  axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      console.log('promise fulfilled')
      setCountries(response.data)
    })

}, [])
console.log('render', countries)

const handleFilterChange = (event) => {
  setNewFilter(event.target.value)
}

const countriesToShow = newFilter === ''
  ? countries
  : countries.filter((country) => country.name.toLowerCase().includes(newFilter.toLowerCase()))

return(
  <div>
    <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
    {countriesToShow.length > 10 ? <p>Too many matches, specify another filter</p> : 
      countriesToShow.length === 1 ? <Country show={true} country={countriesToShow[0]} /> : <Countries countriesToShow={countriesToShow} /> 
      }
  </div>
)

}


export default App