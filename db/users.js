const mongoose = require('./connection')

const Home = require('./schema').Home
const User = require('./schema').User
const FollowedHome = require('./schema').FollowedHome


var users = [{
    email: "john@mail.com",
    password: "john1234"
}, {
    email: "sarah@mail.com",
    password: "sarah1234"
}];


User.remove({})
  .then(() => {
    User.collection.insert(users).then(users => {
      console.log(users)
      process.exit()
    })
  })
  .catch(err => {
    console.log(err)
  })
