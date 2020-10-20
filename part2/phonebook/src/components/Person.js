import React from 'react';
// const Person = ({ person }) => <p>{person.name} {person.number}</p>
const Person = ({ person, deleteContact }) => {
  
    return (
      <li>
        {person.name} {person.number}
        <button onClick={deleteContact}>delete</button>
      </li>
    )
  }

export default Person