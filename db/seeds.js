const Home = require('./schema').Home

let home_1 = new Home({
	street_address: '1653 Anderson Rd',
	unit: '1647',
	state: 'Mclean',
	city: 'VA',
	zipcode: 22102,
	num_bed: 1,
	num_bath: 1,
	sq_ft: 815,
	price_range: 1540,
	img_url: 'https://photos.zillowstatic.com/p_f/ISyvirdmiwi5yw1000000000.jpg'
})

let home_2 = new Home({
	street_address: '1526 Lincoln Circle',
	unit: '223B1500',
	state: 'Mclean',
	city: 'VA',
	zipcode: 22102,
	num_bed: 2,
	num_bath: 2,
	sq_ft: 973,
	price_range: 1865,
	img_url: 'https://photos.zillowstatic.com/p_f/ISmai7lccg4ntc0000000000.jpg'
})

let home_3 = new Home({
	street_address: '455 Eye Street',
	unit: '2F',
	state: 'Washington',
	city: 'DC',
	zipcode: 20001,
	num_bed: 1,
	num_bath: 1,
	sq_ft: 699,
	price_range: 1995,
	img_url: 'https://photos.zillowstatic.com/p_f/ISir8or0w3ar7h1000000000.jpg'
})

let home_4 = new Home({
	street_address: '460 L St NW',
	unit: '3C',
	state: 'Washington',
	city: 'DC',
	zipcode: 20001,
	num_bed: 2,
	num_bath: 2,
	sq_ft: 947,
	price_range: 2825,
	img_url: 'https://photos.zillowstatic.com/p_f/ISivvworzo5c1y0000000000.jpg'
})

let home_5 = new Home({
	street_address: '112 E Montgomery St',
	unit: 'none',
	state: 'Baltimore',
	city: 'MD',
	zipcode: 21230,
	num_bed: 2,
	num_bath: 2,
	sq_ft: 1854,
	price_range: 3000,
	img_url: 'https://photos.zillowstatic.com/p_f/ISmig3nwlfd1os0000000000.jpg'
})

let homes = [home_1, home_2, home_3, home_4, home_5]

Home.remove({})
	.then(() => {
		console.log('Home removed successfully!')

		homes.foreach((home, i) => {
			homes[i].save((err, home) => {
				err ? console.log(err) : console.log(home)
			})
		})
	})
	.catch(err => cosole.log(err))
