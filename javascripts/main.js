'use strict';

let $ = require('jquery');
let movieCtr = require('./movieController.js');
let movieObj = require('./showcaseMovies.js');
let userFactory = require('./userFactory.js');
let fbFactory = require('./fbMovieFactory.js');
let movieFactory = require('./movieFactory.js');

// movieCtr.activateEL();

$("#auth-btn").click( () => {
	userFactory.logInGoogle()
	.then( (result) => {
		let user = result.user.uid;
		console.log("userID", user);
	});
});

// adds movie to firebase on click of 'add to watchlist' button
$(document).on("click", '.add-to-watchlist-btn', (event) => {
	console.log('watch is clicked');
	let thisBtnId = $(event.target).parent().siblings('.card-content').attr('id');
	fbFactory.addMovieToFb(thisBtnId)
	.then( function(data) {
		console.log("added movie data", data);
	});
		//will use movieIDs to compare with thisBtnId -jason
	console.log("thisID?", thisBtnId);
});

$(document).on("click", '.filter', (event) => {
	let $target = $(event.target);
	$('#movie').removeClass('utr uwt wtc fav');
	if($target.hasClass('untracked') ) {
		$('#movie').toggleClass('utr');
	} else if ($target.hasClass('unwatched')) {
		$('#movie').toggleClass('uwt');
	} else if ($target.hasClass('watched')) {
		$('#movie').toggleClass('wtc');
	} else if ($target.hasClass('favorites')) {
		$('#movie').toggleClass('fav');
	}
	movieCtr.filterCheck()
	.then( (data) => {

	});
});

$('#movie').keypress( (event) => {
	if (event.keyCode === 13) {
		movieCtr.clearDOM();
		movieFactory.getMovies()
		// .then( (data) => {
		// return movieCtr.filterCheck();
		// })
		.then( (moredata) => {
			console.log("got there", moredata);
		});

		// console.log("what is this", data);
	}
});