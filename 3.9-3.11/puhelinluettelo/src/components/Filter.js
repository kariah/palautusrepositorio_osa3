import React from 'react'


const Filter = (props) => {
    const persons = props.persons
    const setShowAll = props.setShowAll 

    const filterPersons = (event) => { 

        let filterValue = event.target.value

        if (persons !== undefined && persons.length > 0) {
            const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filterValue.toLowerCase())) 

            if (filteredPersons.length > 0) { 

                setShowAll(filteredPersons)
            }
            else { 
                setShowAll([])
            } 
        }

    }
 

    return (
        <div>
            Filter shown with
            <input onChange={filterPersons}>
            </input>
        </div> 
    )
}

export default Filter
