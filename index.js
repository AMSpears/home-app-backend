// user authentication modified from https://blog.jscrambler.com/implementing-jwt-using-passport/

const express = require('express')
const parser = require('body-parser')
var jwt = require("jwt-simple");
const cors = require('cors')
const passport = require('passport')
var auth = require("./auth.js")();
var cfg = require("./config.js");

const Home = require('./db/schema').Home
const User = require('./db/schema').User
const FollowedHome = require('./db/schema').FollowedHome

const app = express()

app.use(parser.json())
app.use(auth.initialize());

app.use(cors())

app.get('/', (req, res) => {
	res.send('hello world!')
})

// sends back the user's info.  This private route will only run for authenticated token and you can use the req.user.id object inside this route, because this data will be available if you send the right token
// app.get("/user", auth.authenticate(), function(req, res) {
//     res.json(users[req.user.id]);
// });

//This route will be responsible for generating an encoded token with a payload, given to the user that sends the right e-mail and password via req.body.email and req.body.password in the request.
app.post("/token", function(req, res) {
    if (req.body.email && req.body.password) {
        User.findOne({email: req.body.email, password: req.body.password})
				.then(user => {
					if (user) {
            var payload = {id: user.id};
            var token = jwt.encode(payload, cfg.jwtSecret);
            res.json({token: token});
	        } else {
            res.sendStatus(401);
	        }
				})
    } else {
        res.sendStatus(401);
    }
});

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
