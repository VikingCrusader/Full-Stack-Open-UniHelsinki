require('dotenv').config()
const express = require('express');
const Contact = require('./models/contact')
const morgan = require('morgan')
const app = express();
app.use(express.json())
app.use(express.static('dist'))

morgan.token('body', (request) => JSON.stringify(request.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
const PORT = process.env.PORT || 3001

//get all persons
app.get('/api/persons', (request, response) => {
  Contact.find({}).then(contacts => {
    response.json(contacts)
  })
})

//get info
app.get('/info', (request, response) => {
    Contact.find({}).then(contacts => {
        response.send(`<p>Phonebook has info for ${contacts.length} people</p>
        <p>${new Date()}</p>`)
    })
})

//get a specific person
app.get('/api/persons/:id', (request, response) => {
    Contact.findById(request.params.id).then(
        result => {
            if (result != null) {
                response.json(result)
            } else {
                return response.status(404).end()
        }
    })
})

//post a new person
app.post('/api/persons', (request, response) => {
    const body = request.body
    if (!body.name || !body.number) {
        console.log("Name and Number have to be filled")
        return response.status(400).json({ error: 'content missing' })
    }

    const contact = new Contact({
        name: body.name,
        number: body.number
    })

    contact.save().then(
        savedPerson => {
            response.json(savedPerson)
        }
    )
})

//update
//delete

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
