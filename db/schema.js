const mongoose = require('./connection')

const HomeSchema = new mongoose.Schema({
	owner_id: String,
	street_address: String,
	state: String,
	city: String,
	zipcode: Number,
	num_bed: Number,
	num_bath: Number,
	sq_ft: Number,
	price_range: Number,
	img_url: String,
	type_rent_buy: {
		type: String,
		enum: ['Rent', 'Buy'],
		required: true
	}
})

const FollowedHomeSchema = new mongoose.Schema({
	home_id: String,
	note: String
})

const UserSchema = new mongoose.Schema({
	email: String,
	password: String,
	created_homes: [],
	followed_homes: [FollowedHomeSchema]
})



const Home = mongoose.model('Home', HomeSchema)
const User = mongoose.model('User', UserSchema)
const FollowedHome = mongoose.model('FollowHomes', FollowedHomeSchema)

module.exports = {
	Home,
	User,
	FollowedHome
}
