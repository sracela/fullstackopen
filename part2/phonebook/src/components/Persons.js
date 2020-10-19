import React from 'react';
import Person from './Person';

const Persons = ({ personsToShow, deleteContactNumber }) => {  
    return (
      <div>
      {personsToShow.map((person) => <Person key={person.id} person={person} deleteContact={() => deleteContactNumber(person.id)} />)}
      </div>
    )
}

export default Persons