const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/home', { userMongoClient: true })

if (process.env.NODE_ENV == "production") {
  mongoose.connect('mongodb://project3team:project3@ds161146.mlab.com:61146/home-app-db', { userMongoClient: true })
} else {
  mongoose.connect('mongodb://localhost/home', { userMongoClient: true });
}

mongoose.Promise = Promise

module.exports = mongoose

const db = mongoose.connection

db.on('error', err => {
	console.log(err)
})

db.once('open', () => {
	console.log('You are connected!')
})
