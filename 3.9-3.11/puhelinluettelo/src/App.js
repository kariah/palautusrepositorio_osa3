import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
    const [persons, setPersons] = useState([])
    const [infoMessage, setInfoMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null) 

    useEffect(() => {
        personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
                setShowAll(initialPersons)
            })
    }, [])


    const [showAll, setShowAll] = useState(persons)

    return (
        <div>
            <h1>Phonebook</h1>
            <Notification infoMessage={infoMessage} errorMessage={errorMessage} />
            <Filter
                persons={persons}
                setShowAll={setShowAll} />
            <h2>Add new</h2>
            <PersonForm
                persons={persons}
                showAll={showAll}
                setPersons={setPersons}
                setShowAll={setShowAll}
                setInfoMessage={setInfoMessage}
                setErrorMessage={setErrorMessage}
            />
            <h2>Numbers</h2>
            <Persons
                persons={persons}
                showAll={showAll}
                setPersons={setPersons}
                setShowAll={setShowAll}
                setInfoMessage={setInfoMessage}
                setErrorMessage={setErrorMessage}
            />
        </div>
    )
}

export default App

