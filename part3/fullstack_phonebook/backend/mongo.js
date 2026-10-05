const mongoose = require('mongoose')
if (process.argv.length !== 5 && process.argv.length !== 3) {
  console.log('missing arguments or something wrong')
  process.exit(1)
}

// third argument in command line is pwd
// forth is name, fifth is number
const password = process.argv[2]

// connect to mongodb url
const url = `mongodb+srv://zhyiwen820:${password}@cluster0.ztfakno.mongodb.net/contacts?appName=Cluster0`
mongoose.set('strictQuery', false)
mongoose.connect(url)

// schema of object
const contactSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Contact = mongoose.model('Contact', contactSchema)

// if pwd is the only argument, return all contacts
if (process.argv.length === 3) {
    Contact.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(
            contact => console.log(`${contact.name} ${contact.number}`)
        )
        mongoose.connection.close()
    })
} else {
    const contact = new Contact({
      name: process.argv[3],
      number: process.argv[4]
    })
    //save contacts and print success message
    contact.save().then(result => {
    console.log(`added ${result.name} number ${result.number} to phonebook`);
    mongoose.connection.close()
    })
}