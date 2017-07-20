'use strict';

console.log("main load");

let $ = require('jquery');
let movieCtr = require('./movieController.js');
let movieObj = require('./showcaseMovies.js');
let logIn = require('./userFactory.js');


movieCtr.activateEL();

$("#auth-btn").click( function() {
	console.log("a click happened");
	logIn.logInGoogle()
	.then( (result) => {
		console.log("then");
		let user = result.user.uid;
		console.log("a user should have an ID");
		console.log(user);
		//load user movie list
		

	});
});