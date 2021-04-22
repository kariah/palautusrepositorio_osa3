import React from 'react'
import personService from '../services/persons'


const Persons = (props) => {
    const showAll = props.showAll
    const persons = props.persons
    const setPersons = props.setPersons
    const setShowAll = props.setShowAll
    const setInfoMessage = props.setInfoMessage
    const setErrorMessage = props.setErrorMessage

    const removePerson = (id) => { 
        personService
            .remove(id)
            .then(response => {
                console.log("response ", response)

                let filtered = showAll.filter(person => person.id !== id)
                setShowAll(filtered)

                filtered = persons.filter(person => person.id !== id)
                setPersons(filtered)

                setTimeout(() => {
                    let info = `Personid ${id} was deleted succesfully`
                    setInfoMessage(info)
                }, 1000)
                setTimeout(() => {
                    setInfoMessage(null)
                }, 5000)
            })
            .catch(error => { 
                setErrorMessage(
                    `Personid '${id}' was already removed from server`
                )
                setTimeout(() => {
                    setErrorMessage(null) 
                }, 5000)
            })
    }


    return (
        <div>
            {showAll.map(person =>
                <p key={person.id}>{person.name} {person.number}
                    <button onClick={() =>
                        window.confirm(`Delete ${person.name}?`) &&
                        removePerson(person.id)}>Delete</button>
                </p>)}
        </div>
    )
}

export default Persons
