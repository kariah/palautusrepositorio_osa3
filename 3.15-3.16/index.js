require('dotenv').config()
const express = require('express')
var morgan = require('morgan')


const app = express()
app.use(express.static('build'))
app.use(express.json())

const cors = require('cors')
app.use(cors())

morgan.token('body-data', function getPostData(req) {
    return (JSON.stringify(req.body))
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :body-data'))


const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}


const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}
app.use(requestLogger)

const Person = require('./models/person')


app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number missing'
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
        .catch(error => {
            console.log(error)
            response.status(400).send({ error: 'Save person faild' })
        })
})


app.get('/api/persons', (req, res) => {
    Person
        .find({})
        .then(persons => {
            res.json(persons)
        })
        .catch(error => {
            console.log(error)
            response.status(400).send({ error: 'Persons not found' })
        })
})


//GET http://localhost:3001/api/persons/1
app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => {
            console.log(error)
            response.status(400).send({ error: 'Person not found. Malformatted id' })
        })
})

//DELETE http://localhost:3001/api/persons/1
app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => {
            console.log(error)
            response.status(400).send({ error: 'Delete failed. Malformatted id' })
        })
})

//GET http://localhost:3001/info
app.get('/info', (req, res) => {
    let currentDateTime = new Date();
    let html = `<div>
                    <p>Phonebook has info for ${persons.length} people </p>
                    <p>${currentDateTime}</p>
                </div>`
    res.send(html)
})



const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

// olemattomien osoitteiden käsittely
app.use(unknownEndpoint)


// tämä tulee kaikkien muiden middlewarejen rekisteröinnin jälkeen!
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})