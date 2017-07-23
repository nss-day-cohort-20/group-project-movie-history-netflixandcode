'use strict';

let $ = require('jquery');
let movieCtr = require('./movieController.js');
let movieObj = require('./showcaseMovies.js');
let userFactory = require('./userFactory.js');
let fbFactory = require('./fbMovieFactory.js');
let movieFactory = require('./movieFactory.js');
let firebase = require('./firebaseConfig.js');


//even if you stay logged in, you are not yet logged in on pageload, so this listens for when a user becomes logged in
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log("User is signed in.");
	$("#in-btn").addClass("isHidden");
	} else {
		$("#out-btn").addClass("isHidden");

	}
});


//log in and out and toggle the visibility of the login/logout buttons
//log in to google
$("#in-btn").click( () => {
	console.log("log in clicked");
	userFactory.logInGoogle()
	.then( (result) => {
		let user = result.user.uid;
		console.log("userID", user);
		$("#out-btn").removeClass("isHidden");
	});
});

//log out
$("#out-btn").click( () => {
	userFactory.logOut()
	.then( function () {
		$("#out-btn").addClass("isHidden");
	$("#in-btn").removeClass("isHidden");
	 //location.reload();
	 });
});

// adds movie to firebase on click of 'add to watchlist' button
$(document).on("click", '.add-to-watchlist-btn', (event) => {
	console.log('watch is clicked');
	let user = firebase.auth().currentUser;
	if (!user) {
		alert("Please log in to continue.");
	} else {
	let thisBtnId = $(event.target).parent().siblings('.card-content').attr('id');
	fbFactory.addMovieToFb(thisBtnId)
	.then( function(data) {
		console.log("added movie data", data);
	});
	console.log("thisID", thisBtnId);
	}
});

// clicking on a filter button adds a filter class to the search box, then calls on the filterCheck to see which class
// it has and executes the filter functionality.
//the first if statement forces user login
$(document).on("click", '.filter', (event) => {
	let user = firebase.auth().currentUser;
	let $target = $(event.target);
	$('#movie').removeClass('utr uwt wtc fav');
	if (!user) {
		alert("Please log in to continue.");
	} else if($target.hasClass('untracked') ) {
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
		console.log("filter", data);
	});
});


// enter key clears DOM and inserts movie based on search query
$('#movie').keypress( (event) => {
	let user = firebase.auth().currentUser;
	if (!user) {
		alert("Please log in to continue.");
	} else if (event.keyCode === 13) {
			movieCtr.clearDOM();
			movieFactory.getMovies()
			.then( (moredata) => {
				console.log("dom loaded", moredata);
			});
	
	}
});