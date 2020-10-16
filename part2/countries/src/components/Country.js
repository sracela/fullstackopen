import React from 'react';

const Country = ({ show, country }) => {
    if(show){
        return (
            <div>
            <h1>{country.name}</h1>
            <p>capital: {country.capital}</p>
            <p>population: {country.population}</p>
            <h2>languages</h2>
            <ul>
                {country.languages.map((language) => <li key={language.name}>{language.name}</li>)}
            </ul>
            <img src={country.flag} alt="country flag" style={{width: "120px"}} />
            </div>
        )
    }
    return <p>{country.name}</p>
}

export default Country