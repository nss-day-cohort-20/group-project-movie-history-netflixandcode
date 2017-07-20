'use strict';

let $ = require('jquery');
let movieCtr = require('./movieController.js');
let movieObj = require('./showcaseMovies.js');
let userFactory = require('./userFactory.js');

movieCtr.activateEL();


$("#auth-btn").click( function() {
	userFactory.logInGoogle()
	.then( (result) => {
		let user = result.user.uid;
		console.log("ID", user);
		//load user movies
	});
});