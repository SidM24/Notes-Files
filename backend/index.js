const connectToMongo = require('./db')
const express = require('express')
const cors = require('cors')

connectToMongo();
const app = express()
const port = 5000

app.use(express.json())
app.use(cors())

//Availabe routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


app.get('/', (req, res) => {
    res.send('Hello World')
    // res.sendFile(__dirname + '/testpages/homepage.html')
})

app.listen(port, () => {
    console.log(`iNotebook app is running at http://localhost:${port}`)
})

