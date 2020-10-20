import React, { useState, useEffect } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons'
import Notification from './components/Notification'
import Error from './components/Error'
import contactService from './services/contacts'


const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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
        setSuccessMessage(
          `Added '${returnedContact.name}'`
        )
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
        setPersons(persons.concat(returnedContact))    
        setNewName('')
        setNewNumber('')
      })

    }else{
      const person = persons.find(n => n.name.toLowerCase() === newName.toLowerCase())
      const changedPerson = { ...person, number: newNumber }
      if (window.confirm(` ${person.name} is already added to the phonebook, replace the old number with a new one ?`)){ 
        contactService
          .update(person.id, changedPerson)
          .then(returnedPerson => {
            setSuccessMessage(
              `Updated '${person.name}'`
            )
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
            setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
          })
          .catch(error => {
            setErrorMessage(
              `The contact '${person.name}' has already been removed from server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setPersons(persons.filter(n => n.id !== person.id))
          })
      }
    }

  }

  const deleteContactNumber = id => {
    const person = persons.find(n => n.id === id)
    if (window.confirm(`delete contact ${person.name} ?`)){ 
      // console.log('delete person', id)
      contactService
        .deleteObject(id)
        .then(response => {
          setSuccessMessage(
            `Deleted '${person.name}'`
          )
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
          setPersons(persons.filter(n => n.id !== id))
        })
        .catch(error => {
          setErrorMessage(
            `The contact '${person.name}' has already been removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter(n => n.id !== person.id))
        })

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
        <Notification message={successMessage} />
        <Error message={errorMessage} />
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