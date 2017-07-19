'use strict';

let $ = require('jquery');


module.exports.movieObjBuilder = (movieData) => {
	for (let i = 0; i < 9; i++) {
		let movie = {};
		movie.id = movieData.results[i].id;
		movie.title = movieData.results[i].title;
		movie.year = movieData.results[i].release_date;
		movie.image = movieData.results[i].poster_path;
		movie.rating = 0;
		movie.watched = false;
		movie.actors = null;

		console.log("its working", movie);
	}
};

