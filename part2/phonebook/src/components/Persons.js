import React from 'react';
import Person from './Person';

const Persons = ({ personsToShow }) => {  
    return (
      <div>
      {personsToShow.map((person) => <Person person={person} />)}
      </div>
    )
}

export default Persons