const express = require('express')
const parser = require('body-parser')
const cors = require('cors')
const passport = require('passport')

const Home = require('./db/schema').Home
const User = require('./db/schema').User
const FollowedHomes = require('./db/schema').FollowedHomes

const app = express()

app.use(parser.json())
app.use(cors())

app.get('/', (req, res) => {
	res.send('hello world!')
})

app.get('/api/homes', (req, res) => {
	Home.find()
		.then(home => {
			res.json(home)
		})
		.catch(err => console.log(err))
})

app.get('/api/homes/:id', (req, res) => {
	Home.create(req.body)
		.then(home => {
			res.json(home)
		})
		.catch(err => console.log(err))
})

app.get('/api/homes/:id', (req, res) => {
	Home.findById(req.params.id)
		.then(home => {
			res.json(home)
		})
		.catch(err => console.log(err))
})

app.delete('/api/homes/:id', (req, res) => {
	Home.findByIdAndRemove(req.params.id)
		.then(home => {
			res.json(home)
		})
		.catch(err => console.log(err))
})

app.listen(3001, () => {
	console.log('app listening on port 3001')
})
