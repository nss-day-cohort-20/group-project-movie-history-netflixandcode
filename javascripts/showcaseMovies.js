'use strict';

 
let Handlebars = require('hbsfy/runtime');
let movieTemp = require('./template-builder'); 
let $ = require('jquery');
let altPoster = '../imgs/noposter.jpg';


module.exports.movieObjBuilder = (movieData, actors) => {
	// console.log("movie obj actors", actors);
	// console.log("moviedata", movieData);
	// append this data to movieData
	for (let i = 0; i < movieData.length; i++) {		
		movieData[i].rating = 0;
		movieData[i].watched = false;
		movieData[i].cast = actors[i];
		//if there is no poster, a specefic image will display instead
		if (movieData[i].poster_path === null) {
			movieData[i].poster_path = altPoster;
		} else {
			movieData[i].poster_path = (`https://image.tmdb.org/t/p/w342` + movieData[i].poster_path);
		}
	}

	// console.log("did it work?", movieData);
	$("#container").append(movieTemp.makeMovieList(movieData));
}; 


