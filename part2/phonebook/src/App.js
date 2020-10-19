import React, { useState, useEffect } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons'
import contactService from './services/contacts'

// import axios from 'axios'


const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter] = useState('')

  useEffect(() => {
    contactService
      .getAll()
      .then(initialContacts => {
        setPersons(initialContacts)
      })
  }, [])

  const addContact = (event) => {
    event.preventDefault()
    // console.log(event.target)
    const newContact = {
      name: newName,
      number: newNumber
    }
    const b = persons.find((person) => person.name.toLowerCase() === newContact.name.toLowerCase())

    if(b === undefined){
      // setPersons(persons.concat(newContact))
      contactService
      .create(newContact)
      .then(returnedContact => {
        setPersons(persons.concat(returnedContact))    
        setNewName('')
        setNewNumber('')
      })

    }else{
      alert(`${newName} is already added to phonebook`)
    }

  }

  const deleteContactNumber = id => {
    if (window.confirm(`delete contact number ${id} ?`)){ 
      // console.log('delete person', id)
      contactService
        .deleteObject(id)
        .then(response => {
          console.log(response)
          setPersons(persons.filter(n => n.id !== id))
        })
        // .catch(error => {
        //   alert(
        //     `the note '${note.content}' was already deleted from server`
        //   )
        //   setNotes(notes.filter(n => n.id !== id))
        // })

    }
  }

  const handleNameChange = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    // console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const personsToShow = newFilter === ''
  ? persons
  : persons.filter((person) => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
        <PersonForm 
          addContact={addContact}
          newName={newName}
          handleNameChange={handleNameChange}
          newNumber={newNumber}
          handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
        <Persons personsToShow={personsToShow} deleteContactNumber={deleteContactNumber} />
    </div>
  )
}

export default App