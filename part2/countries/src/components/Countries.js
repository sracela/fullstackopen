import React from 'react';

const Countries = ({ countriesToShow }) => {  
    return (
      <div>
      {countriesToShow.map((country) => <p key={country.name}>{country.name}</p>)}
      </div>
    )
}

export default Countries