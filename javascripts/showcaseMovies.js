'use strict';

let Handlebars = require('hbsfy/runtime');
let movieTemp = require('./template-builder'); 
let $ = require('jquery');
let altPoster = '../imgs/noposter.png';


module.exports.movieObjBuilder = (movieData, actors) => {
	console.log("moviedata", movieData);
	for (let i = 0; i < movieData.length; i++) {

		movieData[i].rating = 0;
		// movieData[i].tracked = false;
		movieData[i].cast = actors[i];

		if (movieData[i].poster_path === null) {
			movieData[i].poster_path = altPoster;
		} else {
			movieData[i].poster_path = (`https://image.tmdb.org/t/p/w500` + movieData[i].poster_path);
		}

	}
	$("#container").html(movieTemp.makeMovieList(movieData));

}; 