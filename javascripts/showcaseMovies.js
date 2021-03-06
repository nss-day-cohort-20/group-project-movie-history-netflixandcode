'use strict';

 
let Handlebars = require('hbsfy/runtime');
let movieTemp = require('./template-builder'); 
let $ = require('jquery');
let altPoster = '../imgs/noposter.jpg';

//To allow users to log in (Dustin remember this)
let firebase = require('./firebaseConfig.js');




module.exports.movieObjBuilder = (movieData, actors) => {

	let currentUser = firebase.auth().currentUser.uid;
	console.log("current User", currentUser);
	// finalMovieData = [];
	// console.log("movie obj actors", actors);
	// console.log("moviedata", movieData);
	for (let i = 0; i < movieData.length; i++) {
		movieData[i].rating = 0;
		movieData[i].watched = false;
		movieData[i].cast = actors[i];
		movieData[i].user = currentUser;		

		if (movieData[i].poster_path === null) {
			movieData[i].poster_path = altPoster;
		} else {
			movieData[i].poster_path = (`https://image.tmdb.org/t/p/w342` + movieData[i].poster_path);
		}
	}

	// console.log("did it work?", movieData);
	$("#container").append(movieTemp.makeMovieList(movieData));
}; 


