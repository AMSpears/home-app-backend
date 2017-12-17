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
app.get("/user", auth.authenticate(), function(req, res) {
    res.json(users[req.user.id]);
});

//This route will be responsible for generating an encoded token with a payload, given to the user that sends the right e-mail and password via req.body.email and req.body.password in the request.
// ALSO, will need to update if we are going to hash the password (which we should)
app.post("/login", function(req, res) {
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

// a bit repetative from login.  might want to abstract out.  ALSO, SHOULD WE HASH THE PASSWORD?
app.post("/signup", function(req, res) {
    if (req.body.email && req.body.password) {
        User.create({email: req.body.email, password: req.body.password})
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


// works!  but need to think through what we want to actually send back if there is an error!
app.post('/api/homes', (req, res) => {
	var userid = jwt.decode(req.body.token, cfg.jwtSecret).id
	User.findById(userid)
	.then(user => {
		if (user) {
			Home.create({
				owner_id: userid,
				street_address: req.body.street_address,
				state: req.body.state,
				city: req.body.city,
				zipcode: req.body.zipcode,
				num_bed: req.body.num_bed,
				num_bath: req.body.num_bath,
				sq_ft: req.body.sq_ft,
				price_range: req.body.price_range,
				img_url: req.body.img_url,
				type_rent_buy: req.body.type_rent_buy
			})
			.then(home => {
			res.json(home)
			})
			.catch(err => {
				res.sendStatus(401).json(err)
			})
		} else {
			res.sendStatus(401);
		}
	})
	.catch(err => {
		res.sendStatus(401).json(err)
		})
})

app.get('/api/homes/:id', (req, res) => {
	Home.findById(req.params.id)
		.then(home => {
			res.json(home)
		})
		.catch(err => console.log(err))
})

//need to update so that only if the token matches the home's owner can the user delete the home
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
