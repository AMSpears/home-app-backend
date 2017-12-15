const express = require('express')
const parser = require('body-parser')
const cors = require('cors')
const mongoose = require('./db/schema')

const app = express()

app.use(parser.json())
app.use(cors())

app.get('/', (req, res) => {
	res.send('hello world!')
})

app.listen(3001, () => {
	console.log('app listening on port 3001')
})
