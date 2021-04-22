import React, { useState } from 'react'
import personService from '../services/persons'


const PersonForm = (props) => {
    const persons = props.persons
    const showAll = props.showAll
    const setPersons = props.setPersons
    const setShowAll = props.setShowAll
    const setInfoMessage = props.setInfoMessage 
    const setErrorMessage = props.setErrorMessage

    const [newPerson, setNewPerson] = useState({
        person: {
            id: 0,
            name: "",
            number: ""
        }
    });

    const updateNumber = (id, number) => {
        //console.log("id, number ", id, number)

        const person = persons.find(p => p.id === id)
        const changedPerson = { ...person, number: number }

        personService
            .update(id, changedPerson)
            .then(returnedPerson => {
                setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
                setShowAll(showAll.map(person => person.id !== id ? person : returnedPerson))

                setTimeout(() => {
                    let info = `Personid ${id} was updated succesfully`
                    setInfoMessage(info)
                }, 1000)
                setTimeout(() => {
                    setInfoMessage(null)
                }, 5000)

            })
            .catch(error => { 
                setErrorMessage(`Person '${person.name}' was already deleted from server`)
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
                setPersons(persons.filter(p => p.id !== id)) 
            })
    }


    const addPerson = (event) => {
        event.preventDefault()

        let personFound = null
        let dialogResult

        if (newPerson.person.name !== undefined) {
            /* personFound = (persons.find(person => person.name === newPerson.person.name) ? true : false)*/
            personFound = (persons.find(person => person.name === newPerson.person.name))

            if (personFound != null) {
                dialogResult = window.confirm(`${newPerson.person.name} is already added to phonebook, replace the old number with new one`);
            }
        }

        console.log("personFound ", personFound)

        if (personFound != null) {
            if (dialogResult === true) {
                updateNumber(personFound.id, newPerson.person.number)
                return
            }
            else {
                return
            }
        }

        const personObject = {
            name: newPerson.person.name,
            number: newPerson.person.number,
            id: persons.length + 1,
        }


        //add to server db
        personService
            .create(personObject)
            .then(returnedPerson => {
                setPersons(persons.concat(returnedPerson))
                setShowAll(persons.concat(returnedPerson))
                setNewPerson({
                    person: {
                        id: 0,
                        name: "",
                        number: ""
                    }
                })

                setTimeout(() => {
                    let info = `Person ${personObject.name} was created succesfully`
                    setInfoMessage(info)
                }, 1000)
                setTimeout(() => {
                    setInfoMessage(null)
                }, 5000)
            })
            .catch(error => {
                setErrorMessage(
                    `Create person ${personObject.name} failed.`
                )
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
            })
    }


    const handlePersonChange = (event) => {
        let name = newPerson.person.name
        let number = newPerson.person.number

        if (event.target.id === "name") {
            name = event.target.value
        }
        else if (event.target.id === "number") {
            number = event.target.value
        }


        setNewPerson({
            ...newPerson, person: {
                name: name,
                number: number
            }
        },
        )
    }

    return (
        <form onSubmit={addPerson}>
            <div>
                Name:
                    <input
                    value={newPerson.person.name}
                    onChange={handlePersonChange}
                    id="name"
                />

            </div>
            <div>
                Number:
                    <input
                    value={newPerson.person.number}
                    onChange={handlePersonChange}
                    id="number"
                />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm