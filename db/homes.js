const mongoose = require('./connection')

const Home = require('./schema').Home



var homes = [{
  street_address: "123 street",
	state: "Washington",
}]

Home.remove({})
  .then(() => {
    Home.collection.insert(homes).then(homes => {
      console.log(homes)
      process.exit()
    })
  })
  .catch(err => {
    console.log(err)
  })
