'use strict';

let $ = require('jquery');
let movieCtr = require('./movieController.js');
let movieObj = require('./showcaseMovies.js');
let userFactory = require('./userFactory.js');
let fbFactory = require('./fbMovieFactory.js');
let movieFactory = require('./movieFactory.js');


movieCtr.activateEL();



$("#auth-btn").click( function() {
	userFactory.logInGoogle()
	.then( (result) => {
		let user = result.user.uid;
		console.log("ID", user);
		//load user movies
	});
});

// adds movie to firebase on click of 'add to watchlist' button
$(document).on("click", '.add-to-watchlist-btn', (event) => {
	let thisBtnId = $(event.target).parent().siblings('.card-content').attr('id');
	console.log('watch is clicked');
	movieCtr.getMovieIds()
	.then( function(movieIDs) {
		fbFactory.addMovieToFb(thisBtnId);
		//will use movieIDs to compare with thisBtn Id -jason
		console.log("movie Ids on main", movieIDs," this?", thisBtnId);
	});
});